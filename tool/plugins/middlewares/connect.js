// 
// connect se encarga de comunicarse con el back-end
// 



plug.connect=function(){//configurar conexion con el rest
    return {
        get: async function (data) {
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
              
        },
        post: async function () {
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
          
        },
        put: async function () {
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