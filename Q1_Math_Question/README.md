# Defect Frequency Calculator

Given a class of 30 students using an education product during a 10-minute session, we aim to calculate the defect frequency target per session if the desired defect-free rate for the entire class is 90%.

### Key Assumptions as given and taken by me:
- Each student uses the product in the same way.
- All students use the product simultaneously during a session.
- The defect-free rate applies to the class as a whole.

## Solution

The solution involves using the probability that all students in the class have a defect-free session. The overall probability of the class being defect-free is the product of the probabilities for each student being defect-free.

The defect frequency per student session and for the entire class are then calculated.

Let:

- P(Class is defect-free) = 90% = 0.9.
- P(Student is defect-free) = p.

For the class to be defect-free, every student must have a defect-free session. The probability that all 30 students have a defect-free session is:

- P(Class is defect-free)=(P(Student is defect-free))^30 =p^30

Note: ^ means exponentiation

To solve for p, take the 30th root of both sides:

- p=0.9 ^ ( 1/30 )

Calculating and by approximation:

- p≈0.9966

This means that the probability that a student has a defect-free session is 99.66%.

The defect frequency per student session is the complement of this:

- Defect frequency per student = 1−p = 1 − 0.9966 = 0.0034

Therefore, the approximate defect frequency target per student session is 0.0036 or 0.34%.

### Output

For a class of 30 students with a 90% overall defect-free rate:
- The approximate defect frequency per student session is **0.34%**.
