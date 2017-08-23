    var FERIEMODUL = (function(){
        
         var feriestederListeJSON = { feriesteder: 
            [
                { "land": "Tyskland", "by": "Berlin", "bildeAvBy": "../Bilder/berlin.jpg"},
                { "land": "Tyskland", "by": "Munchen", "bildeAvBy": "../Bilder/munchen.jpg"},
                { "land": "Spania", "by": "Madrid", "bildeAvBy": "../Bilder/madrid.jpg"},
                { "land": "Spania", "by": "Barcelona", "bildeAvBy": "../Bilder/barcelona.jpg"},
                { "land": "Frankrike", "by": "Paris", "bildeAvBy": "../Bilder/paris.jpg"},
                { "land": "England", "by": "Manchester", "bildeAvBy": "../Bilder/manchester.jpg"},
                { "land": "England", "by": "Liverpool", "bildeAvBy": "../Bilder/liverpool.jpg"}
            ]
        };
        
            //returnerer alle feriestedene
            function hentListe(){
                return feriestederListeJSON.feriesteder;
            }
        
            //gjør det enklere å bruke metoden utenfor generatoren
            return {
                hentListe: hentListe
            }; 
  
        }()); //--end module pattern / vacaydesti 
         

        //APP pattern
        var GENERERE_APP = {
            
            //HTML-objekter
            $soekBtn: null,
            $allDestinationsBtn: null,
            
            //lister (Array)
            hentListe: [],
            
            //init
            init: function(){
                this.listeOverDes = FERIEMODUL.hentListe();
                    
                var setElements = function(){
                    GENERERE_APP.$inputfelt = $("#inputfelt");
                    GENERERE_APP.$soekBtn = $("#soekBtn");
                    GENERERE_APP.$allDestinationsBtn = $("#allDestinationsBtn");
                    GENERERE_APP.$destinasjonerSection = $("#destinasjonerSection");
                }();
                    
                var setEvents = function(){
                    var GA = GENERERE_APP;
                    
                    $("#allDestinationsBtn").click(function(){
                        GA.visAlleDestinasjoner(GA.listeOverDes);
                    });
                                                   
                    $("#soekBtn").click(function(){
                        GA.visLand(GA.listeOverDes);
                    });

                }();//--end setEvents
                
                $("#inputfelt").easyAutocomplete(FERIEMODUL.feriestederListeJSON);
            },//--end init
            
            visAlleDestinasjoner: function(liste){
            
                //tømmer seksjonen for hver gang
                $("#destinasjonerSection").empty();
                
                //looper gjennom JSON-liste
                for(i = 0; i < liste.length; i++){
                    
                    //lager HTML-objekter og henter informasjon ut av JSON-listen
                    var $bilde = $("<img class='img-responsive' src=" + liste[i].bildeAvBy + ">");
                    var $div2 = $("<div class='col-md-4' >");
                    var $div = $("<div class='col-md-12 des-post' >");
                    var $land = $("<h1>");
                    var $by = $("<h3>");
                    
                    //henter ut fra JSON-listen
                    $land.html(liste[i].land);
                    $by.html(liste[i].by);
                    
                    //legger variablene (med JSON-objekter) inn i div-en
                    $div.append($land);
                    $div.append($by);
                    $div.append($bilde);
                    
                    $div2.append($div);
                    
                    //legger divene inn i seksjonen
                    $("#destinasjonerSection").append($div2);
                }
            },//--end visDestinasjoner
            
            visLand: function(liste){
                //lager variabel av verdien til inputfeltet og gjør alt til upperCase
                var valgtLand = $("#inputfelt").val().toLowerCase();
                
                $("#destinasjonerSection").empty();
                
                    //looper gjennom JSON-liste
                    for(i = 0; i < liste.length; i++){
                        
                        //hvis land er det samme som input
                        if(valgtLand === liste[i].land.toLowerCase()){
                            
                            //lager variabler for HTML-objekter
                            var $bilde = $("<img class='img-responsive img-search' src=" + liste[i].bildeAvBy + ">");
                            var $div2 = $("<div class='col-md-6' >");
                            var $div = $("<div class='col-md-12 des-post' >");
                            var $land = $("<h1>");
                            var $by = $("<h3>");

                            //henter ut fra JSON-listen
                            $land.html(liste[i].land);
                            $by.html(liste[i].by);

                            //legger variablene (med JSON-objekter) inn i div-en
                            $div.append($land);
                            $div.append($by);
                            $div.append($bilde);

                            $div2.append($div);

                            //legger divene inn i seksjonen
                            $("#destinasjonerSection").append($div2);
                    }//--end if-statment
                }//--end for loop
            }//--end visDestinasjoner
        
        };//--end GENERERE_APP
        
        GENERERE_APP.init();