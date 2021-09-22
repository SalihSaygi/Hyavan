
export const resetPassword = async (user, password) => {
  user.password = password
  await user.save()
}