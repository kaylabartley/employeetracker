INSERT INTO department (name)
VALUES
    ('Front Line'),
    ('Tehnology'),
    ('Business');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Cashier', 13.50, 1),
    ('Financial Analyst', 25.24, 3),
    ('Software Engineer', 40, 2),
    ('Cyber Engineer', 45.15, 2), 
    ('CEO', 70, 3),
    ('Janitor', 10.25, 1),
    ('Shift Manager', 20, 1),
    ('VP of Operations', 65, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Kayla', 'Bartley', 3, 5),
    ('Chelsea', 'Newman', 5, NULL),
    ('Charmaine', 'Green', 1, 7),
    ('Damari', 'Clarke', 2, 8), 
    ('Monique', 'Clayton', 4, 5),
    ('Jillian', 'Romeo', 7, 8),
    ('Judy', 'Dale', 1, 7),
    ('Symone', 'Cole', 6, 7),
    ('Lucille', 'Fley', 8, 5);