INSERT INTO department (name)
VALUES
    ('Front Line'),
    ('Tehnology'),
    ('Business');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Cashier', 28157.17, 1),
    ('Financial Analyst', 52643.47, 3),
    ('Software Engineer', 83428.64, 2),
    ('Cyber Engineer', 94170.08, 2), 
    ('CEO', 146000.12, 3),
    ('Janitor', 21378.59, 1),
    ('Shift Manager', 41714.32, 1),
    ('VP of Operations', 135571.54, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'Kayla', 'Bartley', 3, 2),
    (2, 'Chelsea', 'Newman', 5, NULL),
    (3, 'Charmaine', 'Green', 1, 6),
    (4, 'Damari', 'Clarke', 2, 9), 
    (5, 'Monique', 'Clayton', 4, 2),
    (6, 'Jillian', 'Romeo', 7, 9),
    (7, 'Judy', 'Dale', 1, 6),
    (8, 'Symone', 'Cole', 6, 6),
    (9, 'Lucille', 'Fley', 8, 2);

