// 
// connect se encarga de comunicarse con el back-end
// 


var modelosMDD;


plug.connect=function(){//configurar conexion con el rest
    return {
        get: async function (data) {
                try {
                      var url='http://localhost:3000/modelos?'+$.param(data); //añade el parametro data modificar en version final
                      console.log(url);
                      const res = await fetch(url,{
                        method: 'GET'
                                               
                      });
                      console.log(res);
                      const resDB = await res.json();
                      console.log(resDB);
                      return resDB.model_i.model;
                } catch (e) {
                      console.log(e);// algo ha ido mal
                }
              
        },
        verify: async function (bods) {
            try {
                  const res = await fetch('http://localhost:3000/modelos/verificar/',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                      },
                    body:JSON.stringify(bods)
                  });
                  const resDB = await res.json();
                  console.log('funciona conexion con rest de piStar')
                  console.log(resDB)
            } catch (e) {
                  console.log(e);
                  console.log("no esta conectando el verificador");
                  // algo ha ido mal
            }
          
        },
        put: async function (data) {
            try {
                  const res = await fetch('http://localhost:3000/login',{
                    method: 'POST',
                    body: new URLSearchParams({// conten type x-www-form-urlencoded
                      'password':'123456',
                      'email':"test17"
                    })
                  });
                  const resDB = await res.json();
                  console.log('funciona conexion con rest de piStar')
                  console.log(resDB)
            } catch (e) {
                  // algo ha ido mal
            }
          
        }
    }
}();