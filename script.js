function main(){
    input=document.getElementById("in").value;
    key=parseInt(document.getElementById("key").value)
    type=document.getElementById("Gtype").value;
    console.log(typeof(key))
    if (type == 1 && key != NAN){
        console.log(key)
        CT = C_Encrypt(key,input);
        CT = C_Encrypt(key,CT);
        document.getElementById("out").innerHTML=CT;
    }
    else if(type == 2 && key != NAN){
        PT = C_Decrypt(key,input)
        PT = C_Decrypt(key,PT)
        document.getElementById("out").innerHTML=PT;
    }

}
function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
  }
function C_Encrypt(key, text) {
      alpha="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      console.log(alpha.length)
      out = "";
      t_len=text.length
      for (i=0 ; i < t_len ; i++){
          if (isLetter(text.charAt(i))){
              lindex=((key + alpha.indexOf(text[i])) % 52);
              out+=alpha[lindex]
          }
          else{
              out+=text[i]
          }
      }
      return out;
  
}
function C_Decrypt(key,text){
    alpha="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    out = "";
    t_len=text.length
    for (i=0 ; i < t_len ; i++){
        if (isLetter(text.charAt(i))){
            lindex=((alpha.indexOf(text[i]) - key) % 52);
            if(lindex<0){
                lindex+=52
            }
            out+=alpha[lindex]
        }
        else{
            out+=text[i]
        }
    }
    return out;
}

function saveDynamicDataToFile() {

    var userInput = document.getElementById("out").value;
    
    var blob = new Blob([userInput], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "dynamic.txt");
}

document.getElementById('inputfile')
.addEventListener('change', function() {
  
var fr=new FileReader();
fr.onload=function(){
    document.getElementById('in')
            .textContent=fr.result;
}
  
fr.readAsText(this.files[0]);
})
