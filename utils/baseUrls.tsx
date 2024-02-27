const API_URLS = {
  base: 'https://flask-backend-1skg.onrender.com/', //change to Production
  login: '/login',
  register: '/register',
  upload:'/upload',
  outletFeedback:'/save_review',
  getFiles:'/getfiles',
  deleteFile:'/delete',
  saveFile:'/create_folder',
  getsavedFiles:'/get_saved_files',
  deletesavedFiles:'/delete_saved_file',
  downloadfile: "/download",
  clientFeedback:"/save_client_review"
};

export default API_URLS;
