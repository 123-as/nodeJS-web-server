//fetch 為瀏覽器支援的api，後端不能使用
console.log("test");

// fetch("http://localhost:3000/weather?address=Tapiei").then((res) => {
//   res.json().then((data) => {
//     console.log(data.location);
//   });
// });

const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;
  if (!value) {
    console.log("enter input");
  } else {
    fetch(`http://localhost:3000/weather?address=${value}`).then((res) => {
      res.json().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data.location);
        }
      });
    });
  }
});
