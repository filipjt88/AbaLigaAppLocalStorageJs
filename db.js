let database = [];



let allClubs   = ["Borac","Budućnost","Cedevita Olimpija","Cibona","Crvena zvezda","FMP","Igokea","Mega","Mornar","MZT","Partizan","SC Derby","Split","Zadar"];
let countries  = ["Serbia","Croatia","BIH","Slovenia","Montenegro","North Macedonia"];
let points     = [5,10,15,20,25,30,35,40];    



if(localStorage.database) {
    database = JSON.parse(localStorage.database);
}