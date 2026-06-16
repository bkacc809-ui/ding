async function loadRestaurants(chain) {
  const response = await fetch(`./data/locations_${chain}.json`);
  const locations = await response.json();

  const select = document.getElementById("restaurantSelect");

  select.innerHTML = '<option value="">Select a restaurant</option>';

  locations.map(location => location.Name).sort((a, b) => a.localeCompare(b, "sv")).forEach(name => {const option = document.createElement("option"); option.value = name; option.textContent = name; select.appendChild(option);});
}
const chain = document.body.dataset.chain;
loadRestaurants(chain).catch(error => {console.error("Failed to load restaurant list:", error);});

document.getElementById("getItems").addEventListener("click", async () => {
  const select = document.getElementById("restaurantSelect");
  const restaurantName = select.value;
    if (!restaurantName) {
        alert("Välj en restaurang pucko.");
        return;
    }
});

async function loadProducts(chain, restaurantName) {

}

function checkPassword(){

    password = document.getElementById("passwordInput").value;
    const correctPassword = "nuggets";
    if(password === correctPassword){
        // hide loginbox
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        return true;
    }    return false;
}


function nuggets(){
    orderid = document.getElementById("orderId").value;
    if(orderid.length < 5){
        alert("Order ID pucko");
        return;
    }

    const url = `https://order.maxburgers.com/orders/${orderid}/products`;
    sendOrder(url);
}



async function sendOrder(url) {

    const payload = {
    products: [
        {
            "$type": "FO.Services.Contracts.Models.Products.ProductConfigurable, FO.Services.Contracts",
            "Visible": true,
            "Id": 20717,
            "Title": "Chicken Nuggets, 9 bitar",
            "Checked": false,
            "Quantity": 1,
            "Notes": null,
            "Configurables": [],
            "CategoryId": 15332,
            "context": {
                "type": "category",
                "categoryId": "15332"
            }
        }
    ]
};

const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-No-Csrf": "true",
    "Origin": "https://order.maxburgers.com",
    "Referer": "https://order.maxburgers.com/se/sv-se/categories?menuType=eatin&storeId=329&categoryId=15325",
    "User-Agent": "Mozilla/5.0"
};

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        });

        const text = await response.text();

        console.log("Status:", response.status);
        console.log("Response:", text);
    } catch (error) {
        console.error("Error:", error);
    }
}

sendOrder();
