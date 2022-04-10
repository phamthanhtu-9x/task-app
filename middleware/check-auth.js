export default function(context) {
  // console.log(context.req.headers);
  context.store.dispatch('initAuth', context.req)
}