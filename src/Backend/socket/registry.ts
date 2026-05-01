const socketToUser = new Map<string, string>();
const userToSocket = new Map<string, string>();

export function registerSocket(socketId: string, userId: string) {
  socketToUser.set(socketId, userId);
  userToSocket.set(userId, socketId);
}

export function unregisterSocket(socketId: string) {
  const userId = socketToUser.get(socketId);
  if (!userId) return;

  socketToUser.delete(socketId);
  userToSocket.delete(userId);
}

export function getSocketId(userId: string): string | undefined {
  console.log(userToSocket);
  return userToSocket.get(userId);
}

export function getUserId(socketId: string): string | undefined {
  return socketToUser.get(socketId);
}
