const util = require("util")
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject){
    setTimeout(function() {
      // return reject(new Error("Deu RUIM de Verdade"))

      return resolve({
        id: 1,
        nome: "Aladdin",
        dataNascimento: new Date()
      });
    }, 1000);
  })
  
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject){
    setTimeout(() => {
      return resolve({
        telefone: "111111111",
        ddd: "11"
      });
    });
  })
}

function obterEndereco(idUsuario, callback) {

  setTimeout(() => {
    return callback(null, {
      rua: "dos alfredos",
      nr: 10
    });
  }, 2000);
}

const usuarioPromise = obterUsuario()

usuarioPromise
  .then(function(usuario){
    return obterTelefone(usuario.id)
    .then(function resolverTelefone(result){
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id
        },
        telefone: result
      }
    })
  })
  .then(function(resultado){
    const endereco = obterEnderecoAsync(resultado.usuario.id);
    return endereco.then(function resolverEndereco(result){
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      }
    })
  })
  .then(function(resultado){
    console.log(`
      Nome: ${resultado.usuario.nome}
      Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
       Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
    `);
  })
  .catch(function(error){
    console.log("Deu Ruim", error)
  })

// function resolverUsuario(erro, usuario) {
//   console.log("usuario", usuario);
// }

// obterUsuario(function resolverUsuario(error, usuario) {
//   // null "" 0 === false
//   if (error) {
//     console.error("Deu ruim em usuario", error);
//     return;
//   }
//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if (error1) {
//       console.error("Deu ruim em telefone", error);
//       return;
//     }
//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if (error2) {
//         console.error("Deu ruim em telefone", error);
//         return;
//       }
//       console.log(`
//         Nome: ${usuario.nome},
//         Endereco: ${endereco.rua},
//         Telefone: ${telefone.telefone}
//       `);
//     });
//   });
// });
