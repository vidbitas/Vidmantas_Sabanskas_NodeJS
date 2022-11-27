let user = [];

// module.exports = (io) => {
const socketRoute = (io) => {
  io.on('connect', (socket) => {
    socket.on('start', () => {
      io.emit('start', user);
      socket.emit('star', user);
      console.log('startBack ==== ', user);
    });

    socket.on('out', (userName, pass) => {
      console.log('outtBack ==== ', userName, pass);
      user = user.filter((x) => x.userName !== userName);
      io.emit('start', user);
      socket.emit('star', user);
      console.log('outtBack 2 ==== ', user);
    });

    socket.on('ping', (userName, pass) => {
      console.log('ping === ', userName, pass);
      let rez = false;
      const newArr = user.filter((x) => {
        if (x.userName === userName) return (rez = true);
      });

      console.log('ping 2 rez newArr === ', rez, newArr);
      if (!rez) {
        const newAr = user.filter((x) => x.userName !== userName);
        console.log('ping 3 rez newAr === ', rez, newAr);

        user.push({
          userName: userName,
          password: pass,
          active: false,
        });
        io.emit('ping', user);
        socket.emit('ping', user);
        console.log('ping 4 rez user === ', user);
      } else {
        io.emit('ping', user);
        socket.emit('ping', {
          userName: userName,
          password: pass,
          active: false,
        });
      }
      console.log(user);
    });

    // socket.on("disconnect", () => {
    //     users = users.filter(x => x.id !== socket.id)
    //     socket.broadcast.emit("setUsers", users)
    // })

    // socket.on('like', (likedId) => {
    //   const userIndex = users.findIndex((x) => x.id === likedId);
    //   users[userIndex].likes.push(socket.id);

    //   const myUser = users.find((x) => x.id === socket.id);

    //   if (myUser.likes.includes(likedId)) {
    //     io.to(likedId).emit('match', myUser);
    //     socket.emit('match', users[userIndex]);
    //   }
    // });
  });
};

export default socketRoute;
