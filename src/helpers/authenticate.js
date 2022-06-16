import store from '../store';

const ifNotAuthenticated = (to, from, next) => {
  if(store.getters.getStatusLogin === false) {
    next();
  } else {
    next({
      name: 'dashboard',
      query: {
        redirect: to.name
      }
    })
  }

}

const ifAuthenticated = (to, from, next) => {
  console.log('store.getters.getStatusLogin', store.getters.getStatusLogin)
  if(store.getters.getStatusLogin === true) {
    next(); // Cho phép vào
  } else {
    next({
      name: 'login'
    })
  }
}

export {
  ifNotAuthenticated, ifAuthenticated
}
