// 初始化 LeanCloud
AV.init({
  appId: "mkIfcbivpuTduCrNfh53VqYV-MdYXbMMI",
  appKey: "e4T5MriHgEYtmK7YPvV64awF",
  serverURL: "https://mkifcbivputducrnfh53vqyv.api.lncldglobal.com",
});

// 添加一个变量来存储原始日志数据
let originalLogs = []; // 存储原始日志数据
let currentLogs = []; // 存储过滤后的日志数据

// 页面加载完成后执行
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 设置日期选择器的默认值为今天
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("dateFilter").value = today;

    // 加载数据
    await Promise.all([loadStoreOptions(), loadLogs()]);

    filterLogs();
  } catch (error) {
    console.error("页面加载失败:", error);
    alert("页面加载失败，请刷新重试");
  }
});

// 修改 filterLogs 函数
function filterLogs() {
  const selectedStore = document.getElementById("storeFilter").value;
  const selectedDate = document.getElementById("dateFilter").value;

  // 基于原始数据进行过滤
  currentLogs = originalLogs.filter((log) => {
    const matchesStore =
      selectedStore === "all" || log.get("storeName") === selectedStore;

    if (!selectedDate) return matchesStore;

    const logDate = log.get("date").toISOString().split("T")[0];
    return matchesStore && logDate === selectedDate;
  });

  // 更新统计数据
  updateStatistics(currentLogs);

  // 渲染日志列表
  renderLogs();

  // 渲染选中的盘点记录列表
  renderSelectedLogs();
}

// 修改 renderSelectedLogs 函数
async function renderSelectedLogs() {
  const selectedDate = document.getElementById("dateFilter").value;
  const selectedStore = document.getElementById("storeFilter").value;

  if (!selectedDate || selectedStore === "all") {
    document.getElementById("selectedLogsList").innerHTML = "";
    return;
  }

  try {
    // 设置日期范围
    const date = new Date(selectedDate + "T00:00:00.000Z");
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    // 查询所有类型的盘点记录
    const query = new AV.Query("InventoryCheck");
    query.greaterThanOrEqualTo("date", date);
    query.lessThan("date", nextDay);
    query.equalTo("storeName", selectedStore);
    const logs = await query.find();

    // 按类型分组
    const openingChecks = logs.filter((log) => log.get("type") === "opening");
    const closingChecks = logs.filter((log) => log.get("type") === "closing");
    const restockingChecks = logs.filter(
      (log) => log.get("type") === "restocking"
    );
    const lossChecks = logs.filter((log) => log.get("type") === "loss");

    // 获取所有商品
    const products = new Set();
    logs.forEach((log) => {
      const items = log.get("items") || [];
      items.forEach((item) => {
        if (item.product) {
          products.add(item.product);
        }
      });
    });

    // 生成表格内容
    const rows = Array.from(products).map((product) => {
      // 查找开店盘点记录
      const openingItem =
        openingChecks.length > 0
          ? (openingChecks[0].get("items") || []).find(
              (item) => item.product === product
            )
          : null;

      // 查找闭店盘点记录
      const closingItem =
        closingChecks.length > 0
          ? (closingChecks[0].get("items") || []).find(
              (item) => item.product === product
            )
          : null;

      // 计算进货数量
      let restockQuantity = 0;
      restockingChecks.forEach((check) => {
        const restockItem = (check.get("items") || []).find(
          (item) => item.product === product
        );
        if (restockItem) {
          restockQuantity += restockItem.quantity;
        }
      });

      // 计算报损数量
      let lossQuantity = 0;
      lossChecks.forEach((check) => {
        const lossItem = (check.get("items") || []).find(
          (item) => item.product === product
        );
        if (lossItem) {
          lossQuantity += lossItem.quantity;
        }
      });

      // 计算销售数量：开店 + 进货 - 报损 - 闭店
      const openingQuantity = openingItem ? openingItem.quantity : 0;
      const closingQuantity = closingItem ? closingItem.quantity : 0;
      const salesQuantity =
        openingQuantity + restockQuantity - lossQuantity - closingQuantity;

      return `
        <tr>
          <td>${selectedStore}</td>
          <td>${selectedDate}</td>
          <td>${product}</td>
          <td>${openingItem ? openingItem.quantity : "-"}</td>
          <td>${restockQuantity || "-"}</td>
          <td>${lossQuantity || "0"}</td>
          <td>${closingItem ? closingItem.quantity : "-"}</td>
          <td>${salesQuantity}</td>
        </tr>
      `;
    });

    document.getElementById("selectedLogsList").innerHTML = rows.join("");
  } catch (error) {
    console.error("渲染盘点记录失败:", error);
    alert("渲染盘点记录失败，请重试");
  }
}

// 修改 loadLogs 函数
async function loadLogs() {
  try {
    console.log("开始加载系统日志...");

    const query = new AV.Query("InventoryCheck");
    query.descending("createdAt");
    query.limit(100);
    query.include("operator");
    console.log("执行日志查询...");

    // 保存原始数据
    originalLogs = await query.find();
    console.log("查询到的日志数量:", originalLogs.length);

    // 初始化当前日志为原始数据
    currentLogs = [...originalLogs];

    // 更新统计数据
    updateStatistics(currentLogs);

    // 渲染日志列表
    renderLogs();
  } catch (error) {
    console.error("加载系统日志失败:", error);
    alert("加载系统日志失败: " + error.message);
  }
}

// 编辑日志记录
async function editLog(logId) {
  window.location.href = `edit-inventory.html?id=${logId}`;
}

// 删除日志记录
async function deleteLog(logId) {
  if (!confirm("确定要删除这条记录吗？删除后将无法恢复。")) {
    return;
  }

  try {
    const query = new AV.Query("InventoryCheck");
    const log = await query.get(logId);
    await log.destroy();

    // 从原始数据和当前数据中移除
    originalLogs = originalLogs.filter((l) => l.id !== logId);
    currentLogs = currentLogs.filter((l) => l.id !== logId);

    // 重新过滤和显示
    filterLogs();
    alert("删除成功");
  } catch (error) {
    console.error("删除失败:", error);
    alert("删除失败，请重试");
  }
}

// 添加加载店铺选项的函数
async function loadStoreOptions() {
  try {
    const query = new AV.Query("Store");
    const stores = await query.find();
    const storeFilter = document.getElementById("storeFilter");

    // 获取所有唯一的店铺名称
    const storeNames = new Set();
    stores.forEach((store) => {
      storeNames.add(store.get("name"));
    });

    // 添加店铺选项
    storeNames.forEach((storeName) => {
      const option = document.createElement("option");
      option.value = storeName;
      option.textContent = storeName.replace("食圈儿 ", "");
      storeFilter.appendChild(option);
    });
  } catch (error) {
    console.error("加载店铺选项失败:", error);
  }
}

// 添加 updateStatistics 函数
function updateStatistics(logs) {
  const stats = {
    total: logs.length,
    opening: 0,
    closing: 0,
    restocking: 0,
  };

  // 统计各类型的数量
  logs.forEach((log) => {
    const type = log.get("type");
    if (type === "opening") stats.opening++;
    else if (type === "closing") stats.closing++;
    else if (type === "restocking") stats.restocking++;
  });

  // 更新 DOM
  document.getElementById("totalCount").textContent = stats.total;
  document.getElementById("openingCount").textContent = stats.opening;
  document.getElementById("closingCount").textContent = stats.closing;
  document.getElementById("restockingCount").textContent = stats.restocking;
}

// 修改 renderLogs 函数
function renderLogs() {
  const logsList = document.getElementById("logsList");
  if (!currentLogs || currentLogs.length === 0) {
    logsList.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center;">暂无盘点记录</td>
      </tr>
    `;
    return;
  }

  logsList.innerHTML = currentLogs
    .map((log) => {
      const time = new Date(log.createdAt).toLocaleString();
      const date = log.get("date").toISOString().split("T")[0];

      const operator = log.get("operator");
      const operatorName = operator
        ? operator.get("name") || operator.get("username")
        : "未知";
      const type = log.get("type");
      const storeName = log.get("storeName") || "未知店铺";
      const displayStoreName = storeName.replace("食圈儿 ", "");
      const items = log.get("items") || [];
      const productCount = items.length;

      let typeText = getTypeText(type);

      return `
        <tr data-type="${type}">
          <td>${time}</td>
          <td>${date}</td>
          <td>${typeText}</td>
          <td>${operatorName}</td>
          <td>${displayStoreName}</td>
          <td>${productCount}</td>
          <td>
            <div class="action-buttons">
              <button class="btn btn-primary action-btn" onclick="editLog('${log.id}')">编辑</button>
            </div>
          </td>
          <td>
            <div class="action-buttons">
              <button class="btn btn-danger action-btn" onclick="deleteLog('${log.id}')">删除</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

// 添加排序状态变量
let currentSort = { field: "time", ascending: false }; // 默认按时间降序

// 修改 sortLogs 函数
function sortLogs(field) {
  // 更新排序状态
  if (currentSort.field === field) {
    currentSort.ascending = !currentSort.ascending;
  } else {
    currentSort.field = field;
    currentSort.ascending = true;
  }

  // 更新排序图标
  document.querySelectorAll(".sort-icon").forEach((icon) => {
    icon.textContent = "";
  });
  const currentIcon = document.querySelector(
    `th[onclick="sortLogs('${field}')"] .sort-icon`
  );
  currentIcon.textContent = currentSort.ascending ? "↑" : "↓";

  // 排序数据
  currentLogs.sort((a, b) => {
    let valueA, valueB;

    switch (field) {
      case "time":
        valueA = new Date(a.createdAt).getTime();
        valueB = new Date(b.createdAt).getTime();
        break;
      case "date":
        valueA = new Date(a.get("date")).getTime();
        valueB = new Date(b.get("date")).getTime();
        break;
      case "type":
        valueA = getTypeText(a.get("type"));
        valueB = getTypeText(b.get("type"));
        break;
      case "operator":
        valueA = (
          a.get("operator")?.get("name") ||
          a.get("operator")?.get("username") ||
          "未知"
        ).toLowerCase();
        valueB = (
          b.get("operator")?.get("name") ||
          b.get("operator")?.get("username") ||
          "未知"
        ).toLowerCase();
        break;
      case "store":
        valueA = (a.get("storeName") || "未知店铺").toLowerCase();
        valueB = (b.get("storeName") || "未知店铺").toLowerCase();
        break;
      case "productCount":
        valueA = (a.get("items") || []).length;
        valueB = (b.get("items") || []).length;
        break;
      default:
        valueA = "";
        valueB = "";
    }

    if (valueA < valueB) return currentSort.ascending ? -1 : 1;
    if (valueA > valueB) return currentSort.ascending ? 1 : -1;
    return 0;
  });

  // 重新渲染表格
  renderLogs();
}

// 添加辅助函数来获取类型的显示文本
function getTypeText(type) {
  switch (type) {
    case "opening":
      return "开店盘点";
    case "closing":
      return "闭店盘点";
    case "restocking":
      return "进货盘点";
    case "loss":
      return "报损盘点";
    default:
      return type || "未知类型";
  }
}

// 添加生成销售数据功能
async function generateSalesData() {
  const selectedDate = document.getElementById("dateFilter").value;
  const selectedStore = document.getElementById("storeFilter").value;

  if (!selectedDate) {
    alert("请选择日期");
    return;
  }

  if (selectedStore === "all") {
    alert("请选择具体店铺");
    return;
  }

  try {
    // 更新状态显示
    const statusElement = document.getElementById("salesGenerationStatus");
    statusElement.textContent = "正在生成销售数据...";
    statusElement.className = "generation-status processing";

    // 获取已经计算好的销售数据
    const rows = document.querySelectorAll("#selectedLogsList tr");
    if (!rows.length) {
      throw new Error("没有找到盘点记录数据");
    }

    // 收集所有商品名称和数据
    const productDataMap = new Map();
    Array.from(rows).forEach((row) => {
      const cells = row.cells;
      const productName = cells[2].textContent;
      productDataMap.set(productName, {
        salesQuantity: parseInt(cells[7].textContent, 10),
        openingQuantity: parseInt(cells[3].textContent, 10) || 0,
        restockQuantity: parseInt(cells[4].textContent, 10) || 0,
        lossQuantity: parseInt(cells[5].textContent, 10) || 0,
        closingQuantity: parseInt(cells[6].textContent, 10) || 0,
      });
    });

    // 批量查询所有商品
    const productQuery = new AV.Query("Product");
    productQuery.containedIn("name", Array.from(productDataMap.keys()));
    productQuery.limit(1000); // 设置足够大的限制以获取所有商品
    const products = await productQuery.find();

    // 创建商品名称到商品对象的映射
    const productMap = new Map();
    products.forEach((product) => {
      productMap.set(product.get("name"), product);
    });

    // 处理结果
    const successResults = [];
    const missingProducts = [];

    for (const [productName, data] of productDataMap) {
      const product = productMap.get(productName);
      if (product) {
        successResults.push({
          status: "success",
          product: product,
          ...data,
        });
      } else {
        missingProducts.push({
          status: "missing_product",
          productName,
          ...data,
        });
      }
    }

    // 更新状态显示
    let statusMessage = `成功生成 ${successResults.length} 条销售数据`;
    if (missingProducts.length > 0) {
      statusMessage += `\n未找到以下 ${missingProducts.length} 个商品:\n`;
      missingProducts.forEach((item) => {
        statusMessage += `${item.productName} (销量: ${item.salesQuantity}, 开店: ${item.openingQuantity}, 进货: ${item.restockQuantity}, 报损: ${item.lossQuantity}, 闭店: ${item.closingQuantity})\n`;
      });
    }

    statusElement.textContent = statusMessage;
    statusElement.className =
      "generation-status " +
      (missingProducts.length > 0 ? "warning" : "success");

    // 显示销售数据
    renderSalesData(successResults);
  } catch (error) {
    console.error("生成销售数据失败:", error);
    const statusElement = document.getElementById("salesGenerationStatus");
    statusElement.textContent = "生成销售数据失败: " + error.message;
    statusElement.className = "generation-status error";
  }
}

// 渲染销售数据列表
function renderSalesData(productResults) {
  const salesDataList = document.getElementById("salesDataList");
  const selectedDate = document.getElementById("dateFilter").value;
  const selectedStore = document.getElementById("storeFilter").value;

  if (!productResults || productResults.length === 0) {
    salesDataList.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center;">暂无销售数据</td>
      </tr>
    `;
    return;
  }

  salesDataList.innerHTML = productResults
    .map((result) => {
      const product = result.product;
      const salesQuantity = result.salesQuantity;
      const price = product.get("price") || 0;
      const quantityClass = salesQuantity < 0 ? "negative-sales" : "";

      return `
        <tr class="${quantityClass}">
          <td>${selectedStore.replace("食圈儿 ", "")}</td>
          <td>${selectedDate}</td>
          <td>${product.get("name")}</td>
          <td>${salesQuantity}</td>
          <td>¥${price.toFixed(2)}</td>
          <td>${product.get("category") || "-"}</td>
          <td>${product.get("source") || "-"}</td>
        </tr>
      `;
    })
    .join("");
}

// 上传销售记录
async function uploadSalesData() {
  const selectedDate = document.getElementById("dateFilter").value;
  const selectedStore = document.getElementById("storeFilter").value;

  if (!selectedDate) {
    alert("请选择日期");
    return;
  }

  if (selectedStore === "all") {
    alert("请选择具体店铺");
    return;
  }

  try {
    // 获取销售数据列表中的所有行
    const rows = document.querySelectorAll("#salesDataList tr");
    if (!rows.length) {
      throw new Error("没有找到销售数据");
    }

    // 更新状态显示
    const statusElement = document.getElementById("salesGenerationStatus");
    statusElement.textContent = "正在上传销售记录...";
    statusElement.className = "generation-status processing";

    // 设置日期（只使用年月日）
    const [year, month, day] = selectedDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    // 准备销售数据
    const salesData = [];
    const duplicateProducts = [];

    // 处理每一行数据
    for (const row of Array.from(rows)) {
      const cells = row.cells;
      if (!cells || cells.length < 7) continue; // 跳过表头或无效行

      const productName = cells[2].textContent;
      const quantity = parseInt(cells[3].textContent, 10);
      const price = parseFloat(cells[4].textContent.replace("¥", ""));
      const category = cells[5].textContent;
      const source = cells[6].textContent;

      // 检查是否存在重复记录
      const query = new AV.Query("DailyProductSales");
      query.equalTo("date", date);
      query.equalTo("storeName", selectedStore);
      query.equalTo("productName", productName);
      const existingRecord = await query.first();

      if (existingRecord) {
        // 记录重复的商品
        duplicateProducts.push(productName);
        continue; // 跳过这条记录
      }

      // 创建新记录
      const DailyProductSales = AV.Object.extend("DailyProductSales");
      const salesRecord = new DailyProductSales();

      salesRecord.set("date", date);
      salesRecord.set("storeName", selectedStore);
      salesRecord.set("productName", productName);
      salesRecord.set("quantity", quantity);
      salesRecord.set("price", price);
      salesRecord.set("category", category === "-" ? "" : category);
      salesRecord.set("source", source === "-" ? "" : source);

      salesData.push(salesRecord);
    }

    // 保存销售数据
    if (salesData.length > 0) {
      await AV.Object.saveAll(salesData);
    }

    // 更新状态显示
    let statusMessage = `成功上传 ${salesData.length} 条销售记录`;
    if (duplicateProducts.length > 0) {
      statusMessage += `\n以下 ${
        duplicateProducts.length
      } 个商品已存在，已跳过：\n${duplicateProducts.join("\n")}`;
      statusElement.className = "generation-status warning";
    } else {
      statusElement.className = "generation-status success";
    }
    statusElement.textContent = statusMessage;
  } catch (error) {
    console.error("上传销售记录失败:", error);
    const statusElement = document.getElementById("salesGenerationStatus");
    statusElement.textContent = "上传销售记录失败: " + error.message;
    statusElement.className = "generation-status error";
  }
}
