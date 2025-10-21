export default (sequelize, DataTypes) => {
  const Shoe = sequelize.define("Shoe", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Sedang Dicuci",
    },
    tanggalMasuk: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tanggalSelesai: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "-",
    },
  });

  return Shoe;
};
