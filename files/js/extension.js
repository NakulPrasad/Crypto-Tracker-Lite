const req = new XMLHttpRequest();
const URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

req.open("GET", URL, true);

req.onreadystatechange = function () {
  if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
    let data = JSON.parse(req.responseText);
    let table_update = "";
    for (let rows = 0; rows < 1; rows++) {
      for (var cols = 0; cols < 10; cols++) {
        let image_link = data[cols]["image"];
        (table_update += "<tr>"),
          (table_update += "<td>" + data[cols]["market_cap_rank"] + "</td>");
        table_update +=
          `<td><img src=${image_link} \
                        height="16px" width="16px"/>&nbsp;` +
          data[cols]["name"] +
          `&nbsp; (` +
          data[cols]["symbol"].toUpperCase() +
          ") </td>";
        table_update +=
          "<td>$" + data[cols]["current_price"].toFixed(2) + "</td>";
        table_update += "<td>$" + data[cols]["high_24h"].toFixed(2) + "</td>";
        let percentage_change_24h =
          data[cols]["market_cap_change_percentage_24h"].toFixed(2);
        if (percentage_change_24h >= 0)
          table_update +=
            '<td style="color:green">' + percentage_change_24h + "</td>";
        else
          table_update +=
            '<td style="color:red">' + percentage_change_24h + "</td>";
        table_update += "</tr>";
      }
    }
    document.getElementById("tbody").innerHTML = table_update;
    document.getElementById("time-update").innerHTML =
      new Date().toLocaleTimeString();
  }
};

req.send();
