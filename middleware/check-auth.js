export default function(context) {
  if(document.cookie) {
    context.store.dispatch('initAuth', document.cookie)
  } else {
    context.store.dispatch('logout');
  }
}