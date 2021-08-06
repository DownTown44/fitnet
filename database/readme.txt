First run the SQL commands from initilize_database.sql in MySql.

After the database created you can generate models using the:
npx sequelize-auto -d fitnetdb -o ./database/models -h localhost -u <username> -p <port> -x <password> -e mysql -l esm

