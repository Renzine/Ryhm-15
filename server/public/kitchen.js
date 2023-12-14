let buttonsDiv = document.getElementById("buttons");
setInterval(function (){
    let steps = 0;
    let data = {steps: steps};
    fetch("/kitchen", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    }).then(function (e) {
        return e.json();
    }).then(function(json){
        //console.log(json);
        let orders = json.orders;
        buttonsDiv.innerHTML = "";
        orders.forEach(function (orderNo){
            console.log(orderNo);
            let orderBtn = document.createElement("button");
            orderBtn.innerText = "Send order x to table " + orderNo;
            let data = {steps: orderNo};
            orderBtn.onclick = function (){
                fetch("/moveToPos", {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify(data),
                }).then(function (e) {
                    return e;
                }).then(function (e){
                    console.log(e);
                })
            }

            buttonsDiv.appendChild(orderBtn);

        })
    })
},1000);

