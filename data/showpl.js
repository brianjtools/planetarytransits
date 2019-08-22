        var ms = "JanFebMarAprMayJunJulAugSepOctNovDec";
        var date, dy, mm, yr, hr, mn, tm, path, x = "";

        function prtdsmn(v) {
            var zdstr = "ArTaGeCnLeViLiScSgCpAqPi";
            var nakstr = "AswBhaKriRohMriArdPunPusAslMagP.PU.PHasChiSwaVisAnuJyeMulP.SU.SShrDhaShaP.BU.BRev";
            var m = v % 60;
            var d = Math.floor(v / 60) % 30;
            var n = Math.floor(v / 800.0);
            v /= 60;
            var s = Math.floor(v / 30);
            var ds = "";
            if (d < 10)
                ds += "0";
            ds += d.toString(10);
            var ms = "";
            if (m < 10)
                ms += "0";
            ms += m.toString(10);
            return ds + zdstr.substr(s * 2, 2) + ms + " " + nakstr.substr(n * 3, 3);
        }

        function showUTCDateTime(mon, day, year, hour, min) {
            var s = "";
            if (day < 10) s += "0";
            s += day + " " + ms.substr(mon * 3, 3) + " " + year;
            s += "<br>";
            if (hour < 10) s += "0";
            s += hour + ":";
            if (min < 10) s += 0;
            s += min + " UTC";
            return s;
        }

        function loadJson(path, success, error) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    if (success)
                        success(JSON.parse(this.responseText));
                    else {
                        console.log("got an error");
                        alert("Error opening "+path);
                    }
                }
            };
            xmlhttp.open("GET", path, true);
            xmlhttp.send()
        }

        function prtAyanamsha(ay) {
            d = Math.abs(ay / 60);
            m = Math.abs(ay % 60);
            var ms = "";
            if (m < 10)
                ms += "0";
            ms += m.toString(10);
            return "Lahiri: -" + Math.floor(d) + "\xb0" + ms + "'";
        }

        function showPlanets(data, day, time) {
            var dy = day - 1; // zero offset
            var plstr = "SuMoMaMeJuVeSaRaKe";
            var pp = new Int16Array(9);
            var rt = new Array(9);
            var pr = time * 60;
            pr /= 86400; // seconds in the day
            idx = 0;
            for (var i = 0; i < 8; i++) {
                pp[i] = (data[dy][idx * 2] + pr * data[dy][idx * 2 + 1]) % 21600;
                if (pp[i] < 0) pp[i] += 21600;
                if (data[dy][idx * 2 + 1] < 0) rt[i] = -1;
                else rt[i] = 0;
                idx++;
            }

            // replace moon if afternoon,  noon moon last entry
            if (pr >= 0.5) {  // NOON
                pr -= 0.5;
                pp[1] = (data[dy][16] + pr * data[dy][17]) % 21600;
            }

            // add ketu
            pp[8] = (pp[7] + (180 * 60)) % 21600;

            var s = "";
            s += prtAyanamsha(data[dy][18]) + "<br><br>";
            for (var i = 0; i < 9; i++) {
                s += plstr.substr(i * 2, 2);
                if (rt[i] < 0 && i < 7) // check speed for retrograde
                    s += "R\xa0";
                else
                    s += "  \xa0";
                s += prtdsmn(pp[i]);
                s += "<br>";
            }
            return s;
        }

        date = new Date();
        dy = date.getUTCDate();
        mm = date.getUTCMonth();
        yr = date.getUTCFullYear();
        hr = date.getUTCHours();
        mn = date.getUTCMinutes();
        tm = hr * 60 + mn;

        // get the data for the date -- file = yyyy.mmm.json yyyy should be folder for year
        x += showUTCDateTime(mm, dy, yr, hr, mn) + "<br>";
        path = "data/" + yr + "/" + yr + "." + ms.substr(mm * 3, 3) + ".json";


        loadJson(path, function (success) {
            x += showPlanets(success, dy, tm);
            document.getElementById("showplanets").innerHTML = x;
        }, function (error) {
            alert("Error loading data.\n"+path);
        });
