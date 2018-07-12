$(document).ready(function(){

    var arr = [];
    var slijed = 1;
    var tocno = 0;
    var netocno = 0;
    $.get("./js/data.json", function(data, status){
        arr = data;

        var duljina_prva = Object.keys(arr).length;


        retrived_quiz = Cookies.getJSON("quizCookies");

        if(retrived_quiz != null){
            var duljina = Object.keys(arr).length;

            for (var i = 0; i < retrived_quiz.length; i++) {
                arr[duljina] = retrived_quiz[i];
                duljina++;
            }
        }

        console.log(arr);

        for (var i = 0; i < Object.keys(arr).length; i++) {

            var row = $("<div class='row'></div>");
            var col = $("<div class='col-lg-12 poravnanjeCenter'></div>");
            var card = $("<div class='card text-white bg-primary'></div>");
            var cardB = $("<div class='card-body'></div>");
            var h4 = $("<h4 class='card-title nazivPitanja'></div>");
            var anchor = $("<a></a>");
            anchor.append(arr[i]["nazivKviza"]);
            if(i < duljina_prva){
                anchor.attr("href", "./igrajKviz.html#kviz=" + i);
            }else{
                anchor.attr("href", "./igrajKviz.html#kvizC=" + String(i - duljina_prva));
            }
            anchor.addClass("text-white");
            h4.append(anchor);
            cardB.append(h4);
            card.append(cardB);
            col.append(card);
            row.append(col);
            $(".container-fluid").append(row);

        }

    });



});
