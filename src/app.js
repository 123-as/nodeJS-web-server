const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("../utils/forecast");
const geocode = require("../utils/geocode");

//引進靜態檔案，不能是相對路徑，必須要根目錄的絕對路徑
const app = express();

const staticPath = path.join(__dirname, "..", "public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//customize server
//告訴express從public資料夾載入靜態資源
//當在html引用/img/girl.jpg時，express會從public中找，也就是public/img/girl.jpg
app.use(express.static(staticPath));

app.set("view engine", "hbs");
//自定義views路徑
app.set("views", templatePath);

//設定partial檔案
hbs.registerPartials(partialsPath);

//當有人試圖訪問該domain，server 應給出甚麼回應
app.get("/", (req, res) => {
  //第一額參數是檔案名稱，第二個是模板可以訪問的值
  res.render("index", {
    title: "weather",
    name: "Paul",
  });
});

app.get("/home", (req, res) => {
  //當sent object, express會自動檢查然後轉為JSON
  res.send({
    name: "PAUL",
    age: 25,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Paul",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Paul",
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404 Page",
    errorText: "Help Article not found.",
    name: "Paul",
  });
});

app.get("/weather", (req, res) => {
  //get query string
  const { address } = req.query;
  if (!address) {
    res.send({
      error: "You must provide address.",
    });
    return;
  }

  geocode(address, (error, { latitude, longitude, full_address } = {}) => {
    if (error) {
      res.send({ error });
      return;
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        res.send({ error });
        return;
      }

      res.send({
        location: address,
        full_address,
        forecast: forecastData,
      });
    });
  });
});

//匹配到還沒有匹配到的路徑，常用於:404頁面
app.get("*", (req, res) => {
  res.render("error", {
    title: "404 Page",
    errorText: "Page not found.",
    name: "Paul",
  });
});

//啟動伺服器
app.listen(3000, "0.0.0.0", () => {
  console.log("Webserver Start.");
});
