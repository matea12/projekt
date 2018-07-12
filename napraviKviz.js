$(document).ready(function(){

    var arr = [];
    var duljina_kvizova = 0;
    $.get( "./js/data.json", function(data) {
        duljina_kvizova = Object.keys(data).length;
    });

    $("button.dodajPitanje").click(function(){
        var upit = {"pitanje": "",
                        "A": "", "B": "",
                        "C": "", "D": "",
                        "T": ""};

        if($(".pitanje").val() == "" || $(".pitanje").val() == " "){
            alert("Nepotpuno pitanje")
            return false;
        }

        upit["pitanje"] = $(".pitanje").val();

        var check_validity = true;

        $(".odgovor").each(function(index){
            if($(this).val() == "" || $(this).val() == " "){
                alert("Nepotpuni odgovori");
                check_validity = false;
                return false;
            }
            switch (index){
                case 0:
                    upit["A"] = $(this).val();
                case 1:
                    upit["B"] = $(this).val();
                case 2:
                    upit["C"] = $(this).val();
                case 3:
                    upit["D"] = $(this).val();
            }
        });

        if (check_validity){
          upit["T"] = upit[$("#izborOdgovora").val()];

          arr.push(upit);

          $(".odgovor").each(function(index){
              $(this).val("");
          })

          $(".pitanje").val("");

          console.log(arr);
        }


    });

    $(".zavrsiKviz").click(function(){
        var nazivKviza = prompt("Unesite naziv kviza");

        if(nazivKviza != null){
            // Konstruiranje formata objekta

            var appending = {
              "nazivKviza": nazivKviza,
              "ukupnoPitanja": Object.keys(arr).length,
              "tocnoOdgovorenih": 0,
              "netocnoOdgovorenih": 0,
              "brojIgranja": 0,
              "uspjesnost": 0,
              "pitanja": arr
            }

            var allQuiz;

            if(Cookies.get("quizCookies") == null){
              allQuiz = [];
              allQuiz.push(appending);
              Cookies.set('quizCookies', allQuiz);
            }else{
              var allQuiz = Cookies.getJSON("quizCookies");
              allQuiz.push(appending);
              Cookies.set('quizCookies', allQuiz);
            }

            Cookies.get("quizCookies");


        }
    });

});
