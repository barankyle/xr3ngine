export default async (context: any): Promise<void> => {
  let { app, data } = context
  await app.service('user-relationship').Model.update({
    type: data.type,
  }, {
    where: {
      userId: data.userId,
      relatedUserId: data.relatedUserId
    }
  })
  let result = await app.service('user-relationship').Model.findAll({
    where: {
      userId: data.userId,
      relatedUserId: data.relatedUserId
    }
  })
  if (result.length === 0) {
    throw new Error('Invalid relationship pairing')
  }

  context.result = result[0]
  return context
}
