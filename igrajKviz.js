$(document).ready(function(){

    var arr = [];
    var slijed = 1;
    var tocno = 0;
    var netocno = 0;

    $.get("./js/data.json", function(data, status){
        url = window.location.href;

        var id;

        if(url.search("#kvizC=") != -1){
            id = url.substring(url.search("#kvizC=") + 7, url.length);
            arr = Cookies.getJSON("quizCookies")[id];
        }else{
            id = url.substring(url.search("#kviz=") + 6, url.length);
            arr = data[id];
        }

        var ukupnoPitanja = "Pitanje " + slijed + "/" + arr["ukupnoPitanja"];
        $(".brojPitanja").text(ukupnoPitanja);

        $(".nazivPitanja").text(arr["pitanja"][slijed - 1]["pitanje"]);

        $(".kartaA").text(arr["pitanja"][slijed - 1]["A"]);
        $(".kartaB").text(arr["pitanja"][slijed - 1]["B"]);
        $(".kartaC").text(arr["pitanja"][slijed - 1]["C"]);
        $(".kartaD").text(arr["pitanja"][slijed - 1]["D"]);

    });

    $(".odgovor").click(function(ev){
        var odg = $(this).find("h4").text();
        if (odg == arr["pitanja"][slijed - 1]["T"]){
            tocno++;
            $(this).find(".karta").addClass("bg-success");
            setTimeout(inc.bind(null, this), 2000);
        }else{
            netocno++;
            $(this).find(".karta").addClass("bg-danger");
            setTimeout(dec.bind(null, this), 2000);
        }

        if(slijed >= arr["ukupnoPitanja"]){
            $("body").fadeToggle(2000, function(){
                $(".container-fluid").hide();
                $(".container").hide();
                $("body").fadeToggle();

                // Dodavanje statistike

                var table = $("<table class='table'></table>");
                var thead = $("<thead class='thead-dark'></thead>");
                var tr_h1 = $("<tr></tr>");
                var th1 = $("<th scope='col'>Tocno</th>");
                var th2 = $("<th scope='col'>Netocno</th>");
                var th3 = $("<th scope='col'>Ukupno</th>");
                var th4 = $("<th scope='col'>Postotak</th>");
                tr_h1.append(th1);
                tr_h1.append(th2);
                tr_h1.append(th3);
                tr_h1.append(th4);
                thead.append(tr_h1);

                var tbody = $("<tbody></tbody>");
                var tr = $("<tr></tr>");
                var td1 = $("<td>" + tocno + "</td>");
                var td2 = $("<td>" + netocno +"</td>");
                var td3 = $("<td>" + slijed + "</td>");
                var td4 = $("<td>" + parseFloat((tocno / slijed) * 100).toFixed(2) + " %</td>");

                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                tr.append(td4);
                tbody.append(tr);

                table.append(thead);
                table.append(tbody);

                $("body").append(table);

                //$("body").append("Tocno odgovorenih: " + tocno);
                //$("body").append("<br>");
                //$("body").append("Netocno odgovorenih: " + netocno);
            });
        }else{
            slijed++;
        }

        function inc(t){
            $(t).find(".karta").removeClass("bg-success");
            var ukupnoPitanja = "Pitanje " + slijed + "/" + arr["ukupnoPitanja"];
            $(".brojPitanja").text(ukupnoPitanja);

            $(".nazivPitanja").text(arr["pitanja"][slijed - 1]["pitanje"]);

            $(".kartaA").text(arr["pitanja"][slijed - 1]["A"]);
            $(".kartaB").text(arr["pitanja"][slijed - 1]["B"]);
            $(".kartaC").text(arr["pitanja"][slijed - 1]["C"]);
            $(".kartaD").text(arr["pitanja"][slijed - 1]["D"]);

        }

        function dec(t){
            $(t).find(".karta").removeClass("bg-danger");
            var ukupnoPitanja = "Pitanje " + slijed + "/" + arr["ukupnoPitanja"];
            $(".brojPitanja").text(ukupnoPitanja);

            $(".nazivPitanja").text(arr["pitanja"][slijed - 1]["pitanje"]);

            $(".kartaA").text(arr["pitanja"][slijed - 1]["A"]);
            $(".kartaB").text(arr["pitanja"][slijed - 1]["B"]);
            $(".kartaC").text(arr["pitanja"][slijed - 1]["C"]);
            $(".kartaD").text(arr["pitanja"][slijed - 1]["D"]);

        }

    });




});
