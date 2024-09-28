
class Account extends Entity {

  static URL = '/account'
  static get(id = '', callback){
    createRequest({
      url: `${this.URL}/${id}`,
      method: 'GET',
      callback: callback
    })
  }
}



// Account.get(1, (err, res) => {
//   console.log(res);
// })