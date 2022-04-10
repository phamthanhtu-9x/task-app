export default function(context) {
  context.store.dispatch('initAuth', document.cookie)
}