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

function getSpecificData(id){

  firebase.database().ref('visitors/' + id).once('value').then(function(snapshot) {
    var data = snapshot.val();
    var username = data.name;
    var companyname = data.company_name;
    var genderMale = data.male;
    var genderFemale = data.female;
    var birthdate = data.birthdate;
    var wholesale = data.wholesale;
    var retailer = data.retailer;
    var mail = data.mail;
    var number = data.number;
    var dropdown = data.dropdown;

    document.getElementById("name").value = username;
    document.getElementById("company_name").value = companyname;

    if(genderMale == true || genderMale == "on"){
      document.getElementById("gender_male").checked = true;
    }
    if(genderFemale == true || genderFemale == "on"){
      document.getElementById("gender_female").checked = true;
    }
    if(wholesale == true || wholesale == "on"){
      document.getElementById("wholesale").checked = true;
    }
    if(retailer == true || retailer == "on"){
      document.getElementById("retailer").checked = true;
    }
    document.getElementById("mail").value = mail;
    document.getElementById("number").value = number;
    document.getElementById("dropdown").value = dropdown;
    document.getElementById("birthdate").value = birthdate;
  });
}

function getData(){
  var tblUsers = document.getElementById('tbl_users_list');
  var databaseRef = firebase.database().ref('visitors/');
  var rowIndex = 1;

  databaseRef.once('value', function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();

      var row = tblUsers.insertRow(rowIndex);
      var cellId = row.insertCell(0);
      var name = row.insertCell(1);
      var companyname = row.insertCell(2);
      var gender = row.insertCell(3);
      var birthdate = row.insertCell(4);
      var bussiness = row.insertCell(5);
      var mail = row.insertCell(6);
      var number = row.insertCell(7);
      var dropdown = row.insertCell(8);
      var cellAct = row.insertCell(9);
      var cellDel = row.insertCell(10);

      cellId.appendChild(document.createTextNode(childData.id));
      name.appendChild(document.createTextNode(childData.name));
      companyname.appendChild(document.createTextNode(childData.company_name));

      var maleGender = childData.male;
      var bussinessType = childData.wholesale;

      if(maleGender == true || maleGender == "on"){
        gender.appendChild(document.createTextNode("Male"));
      }
      else if(maleGender == false || maleGender == "off"){
        gender.appendChild(document.createTextNode("Female"));
      }
      else{
        gender.appendChild(document.createTextNode("Not specified"));
      }

      if(bussinessType == true || bussinessType == "on"){
        bussiness.appendChild(document.createTextNode("Wholesaler"));
      }
      else if(bussinessType == false || bussinessType == "off"){
        bussiness.appendChild(document.createTextNode("Retailer"));
      }
      else{
        bussiness.appendChild(document.createTextNode("Not specified"));
      }

      mail.appendChild(document.createTextNode(childData.mail));
      number.appendChild(document.createTextNode(childData.number));
      dropdown.appendChild(document.createTextNode(childData.dropdown));
      birthdate.appendChild(document.createTextNode(childData.birthdate));
      
      var x = document.createElement("INPUT");
      x.setAttribute("type", "button");
      x.setAttribute('class',"btn btn-danger");
      x.setAttribute("value", "Delete");
      x.setAttribute("onclick", "del_prog('" + cellId.textContent + "');");
      cellDel.appendChild(x);
      
      var aTag = document.createElement('a');
      aTag.setAttribute('class',"btn btn-success");
      aTag.setAttribute('href', "admin2.html?id=" + cellId.textContent);
      aTag.innerHTML = "Edit";
      cellAct.appendChild(aTag);
      
      rowIndex = rowIndex + 1;
    });
  });
}

function del_prog(id) {
  firebase.database().ref().child('/visitors/' + id).remove();
  alert('Deleted successfully!');
  reload_page();
}

function reload_page() {
  window.location.reload();
}

function submitDataUP(){
  var id = document.getElementById("idcell").value;
  var name = document.getElementById("name").value;
  var company_name = document.getElementById("company_name").value;
  var male = document.getElementById("gender_male").checked;
  var female = document.getElementById("gender_female").checked;
  var birthdate = document.getElementById("birthdate").value;
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
      birthdate : birthdate,
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