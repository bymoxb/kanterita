INSERT INTO vaccine_types (id, name) VALUES (1, 'Pfizer');
INSERT INTO vaccine_types (id, name) VALUES (2, 'AstraZeneca');
INSERT INTO vaccine_types (id, name) VALUES (3, 'Sputnik');
INSERT INTO vaccine_types (id, name) VALUES (4, 'Jhonson&Jhonson');

INSERT INTO public.employees (id, ci, email, firstname, lastname) VALUES (1, '1234567890', 'moxb@outlook.es', 'luis', 'fernando');
INSERT INTO public.users (id, password, rol, username, employee_id) VALUES (2, 'password', 'ADMIN', 'luis', 1);