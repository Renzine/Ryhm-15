

function order(){
        let steps = 0;
        let data = {steps: steps};
        fetch("/order2", {
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
            console.log("SENT DATA");
        })
}

