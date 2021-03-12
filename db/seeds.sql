INSERT INTO department (id, name)
VALUES
    (1, 'Front Line'),
    (2, 'Tehnology'),
    (3, 'Business');

INSERT INTO role (id, title, salary, department_id)
VALUES 
    (1, 'Cashier', 28157.17, 1),
    (2, 'Financial Analyst', 52643.47, 3),
    (3, 'Software Engineer', 83428.64, 2),
    (4, 'Cyber Engineer', 94170.08, 2), 
    (5, 'CEO', 146000.12, 3),
    (6, 'Janitor', 21378.59, 1),
    (7, 'Shift Manager', 41714.32, 1),
    (8, 'VP of Operations', 135571.54, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'Kayla', 'Bartley', 3, 5),
    (2, 'Chelsea', 'Newman', 5, NULL),
    (3, 'Charmaine', 'Green', 1, 7),
    (4, 'Damari', 'Clarke', 2, 8), 
    (5, 'Monique', 'Clayton', 4, 5),
    (6, 'Jillian', 'Romeo', 7, 8),
    (7, 'Judy', 'Dale', 1, 7),
    (8, 'Symone', 'Cole', 6, 7),
    (9, 'Lucille', 'Fley', 8, 5);

