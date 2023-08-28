drop database if exists employeeDatabase;
create database employeeDatabase;
use employeeDatabase;

create table department(
	id int not null auto_increment primary key,
    name varchar (30)
);

insert into department (name)
	values ("Quality Control"),
	("Finance"),
    ("Development"),
    ("Cybersecurity");

create table role(
	id int not null auto_increment primary key,
    title varchar(30),
    salary decimal,
    department_id int,
    foreign key (department_id) references department(id)
);

insert into role (title, salary, department_id)
	values ("Manager", 20000, 1),
	("App Developer", 15000, 2),
    ("Bug Tester", 50000, 3),
    ("CEO", 30000, 4); 

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name varchar(30) not null,
  role_id int,
  manager_id int,
  foreign key (role_id) references role(id),
  foreign key (manager_id) references employee(id)
);

insert into employee (first_name, last_name, role_id, manager_id)
	values ("Sandy", "Williams", 4, null),
    ("Andy", "Smith", 2, 1),
    ("Maria", "Navon", 3, 1),
    ("Mark", "Adler", 1, 1);