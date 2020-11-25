function array_move(arr, user_index) {
    arr.splice(0, 0, arr.splice(user_index, 1)[0]);
    return arr;
};

array_move([],'user[index]');