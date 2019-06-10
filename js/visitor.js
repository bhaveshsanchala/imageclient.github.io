// DB initialization keys
var config = {
    apiKey: "AIzaSyBtB1AVSxjCnC3ecd-Q-g3O1Z9L3K7PKn8",
    authDomain: "test-5c2c5.firebaseapp.com",
    databaseURL: "https://test-5c2c5.firebaseio.com",
    projectId: "test-5c2c5",
    storageBucket: "test-5c2c5.appspot.com",
    messagingSenderId: "875907445269",
    appId: "1:875907445269:web:d3f727e985babdde"
  };
firebase.initializeApp(config);

function submitData(){
    var id = firebase.database().ref().child('visitors/').push().key;
    var name = document.getElementById("name").value;
    var company_name = document.getElementById("company_name").value;
    var male = document.getElementById("gender_male").checked;
    var female = document.getElementById("gender_female").checked;
    var wholesale = document.getElementById("wholesale").checked;
    var retailer = document.getElementById("retailer").checked;
    var mail = document.getElementById("mail").value;
    var number = document.getElementById("number").value;
    var dropdown = document.getElementById("dropdown").value;

    var data = {
        id : id,
        name : name,
        company_name : company_name,
        male : male,
        female : female,
        wholesale : wholesale,
        retailer : retailer,
        mail : mail,
        number : number,
        dropdown : dropdown
    }

    var updates = {};
    updates['visitors/' + id] = data;
    firebase.database().ref().update(updates);

    alert('Visitor Added Successfully');
}