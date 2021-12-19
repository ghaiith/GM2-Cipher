function main(){
    input=document.getElementById("in").value;
    key=parseInt(document.getElementById("key").value)
    type=document.getElementById("Gtype").value;
    console.log(typeof(key))
    if (type == 1){
        CT = C_Encrypt(key,input);
        CT = C_Encrypt(key,CT);
        document.getElementById("out").innerHTML=CT;
    }
    else{
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
              console.log(alpha.indexOf(text[i]))
              console.log(lindex)
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