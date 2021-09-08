
//   




var login = () => {

       
      var val=document.getElementById("firstinput").value;

      if (val.length==0)
      {
        alert("Please enter username to login");
        return false;
      }

      else {
        try {
          fetch("http://192.168.1.151:8080/api/v1/login", {
            method: "POST",
            body: JSON.stringify({
              username: val
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(resp => resp.json())
              .then(data =>{
                jwtToken = data.token;
                localStorage.setItem("jwtToken",data.token)
              });
        } catch (e) {
          console.log(e);
          console.log('--------------------------');
        }
        document.getElementById("firstinput").value='';
        localStorage.setItem("zzz",document.getElementById("first").innerHTML)
        document.getElementById("first").innerHTML='<a data-rel="back" data-transition="slide">&#8592;</a><div id=\'firsttitle\'>My Movies</div> <div id="firsticon"><i class=\'fas fa-user-alt\' style=\'font-size:48px;color:white\'></i></div><div id="logininfo">'+val+'<br><br><p onclick="origlog()">Logout</p></div>';
        return false;

      }
    }

    function origlog() {
        localStorage.setItem('jwtToken','nope');
        document.getElementById("first").innerHTML=localStorage.getItem('zzz');}


        

    function createFilm () {

        
        var title=document.getElementById("secondtitle").value;
  
        var rating=document.getElementById("secondrating").value;
  
  
  
        if (title.length==0)
        {
          alert("Please enter a film title");
          return false;
        }
  
        if (rating.toString().length==0)
        {
          alert("Please enter a rating");
          return false;
        }
  
        if (isNaN(rating))
        {
          alert("Please enter a number between 1 and 100");
          document.getElementById("secondrating").value = '';
          return false;
        }
  
        if ((rating<0) | (rating>100))
        {
          alert("Please enter a rating between 1 and 100");
          document.getElementById("secondrating").value = '';
          return false;
        }
        
        else {
  
            // a=localStorage.getItem("jwtToken");
          document.getElementById("secondtitle").value = '';
          document.getElementById("secondrating").value = '';
            try {
              fetch("http://192.168.1.151:8080/api/v1/films", {
                method: "POST",
                body: JSON.stringify({
                  name: title,
                  rating: rating.toString()
                }),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem("jwtToken")
                }
              }).then(resp => {
                setTimeout(function() {
                  if (resp.status == 200) {
                    
                    alert("'"+title+"'"+" "+"has been added to My Films");
                    getFilms();
                  } else {
                    
                    alert("Error 403: Please login to add films");
                  }
                }, 0);
              });
              
            } catch(e) {
                console.log(e);
                console.log('-------------------------');
            }
  
            
            
          }
        }
  
function getilms(){
            document.getElementById('thirdmain').innerHTML='no';
        }

function getFilms (){

    try {
      fetch("http://192.168.1.151:8080/api/v1/films", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => resp.json())
          .then(results => {
            if (results.length >0){
                var content='';
                var num=0;
              results.forEach(data => {
                  num++;
                  localStorage.setItem(num.toString(),data.name)
                  content=content+ '<div id="films"><div id="innerfilms1"><div id="innertitle">'+data.name+'</div><div id="innerrating">Rating: '+data.rating+'%</div></div><div id="innerfilms2"><div></div><a><div id="editrating" onclick="editrating('+num+')">Edit rating</div></a></div></div>';


            });
            document.getElementById('thirdmain').innerHTML=content;

           }});
           return false;
      
    } catch(e) {
      console.log(e);
      console.log('-------------------------');
    }
    
  }

  var a='a';
function editrating(name){
    if(localStorage.getItem('jwtToken')=="nope"){
        alert("Login to change ratings of films");
        return false;
    }
    else{
    document.getElementById("uuu").innerHTML=localStorage.getItem(name);
    localStorage.setItem("current",localStorage.getItem(name));
    window.location.hash = '#four';
}}

var changeFilms = () => {

    title=localStorage.getItem("current");
    // alert(vv.value);
    vv=document.getElementById("upin").value;
    document.getElementById("upin").value='';    


    try {
      fetch("http://192.168.1.151:8080/api/v1/films", {
        method: "PUT",
        body: JSON.stringify({
          name: title,
          rating: vv
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {
        alert("rating of "+title+ " has been updated");
        getFilms();
    window.location.hash = '#third';


      });
      
      
    } catch(e) {
        console.log(e);
        console.log('-------------------------');
    }

      return false;
  }

  function changeno(){
    window.location.hash = '#third';
    return false;

  }


function bb(){
  aa=window.innerHeight;
  document.getElementById('first').style.height=aa*0.85+ 'px';
  document.getElementById('second').style.height=aa*0.85+ 'px';
  document.getElementById('four').style.height=aa*0.85+ 'px';

  localStorage.setItem("jwtToken","nope");
  getFilms();

}