import db from "@/lib/db";

async function handler(req, res){

  if(req.method==="GET"){
    const {iduser} = req.body;
    if(!iduser){
      return res.status(400).json({ message: "id tidak boleh kosong" });
    }
    let sql = 'SELECT * FROM users WHERE iduser=?';
    db.query(sql, [iduser], (err, result)=>{
      if(err){
        return res.status(500).json({
          message: "Terjadi kesalahan pada database",
          error: err.message
        });
      }
      if(result.length===0){
        return res.status(404).json({
          message: "Data tidak ditemukan",
          datas: result[0]
        });
      }
      return res.status(200).json({
          message: "Data ditemukan",
          datas: result[0]
        });
    });
  }


}

export default handler;