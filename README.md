Test Cases

Test Case 1: Booking Date, Time, and Number of Players
Objective: Ensure that the user can book a date, time, and specify the number of players.

Steps:
Render the booking component.
Fill in the date field.
Fill in the time field.
Enter the number of players.
Assert that the inputs are correctly filled.
Expected Result: The user can successfully enter the date, time, and number of players.

-------------------------------------------

Test Case 2: Choosing Shoe Size for Each Player
Objective: Ensure that the user can select shoe sizes for each player.

Steps:
Add players.
For each player, select a shoe size.
Assert that each shoe size input is correctly filled.
Expected Result: Each player can have a shoe size selected.

-------------------------------------------

Test Case 3: Removing a Shoe Size Field
Objective: Ensure that the user can remove a shoe size field if too many were added.

Steps:
Add multiple shoe size fields.
Remove a shoe size field.
Assert that the field is removed.
Expected Result: The user can successfully remove a shoe size field.

-------------------------------------------

Test Case 4: Submitting Reservation and Receiving Confirmation
Objective: Ensure that the user can submit the reservation and receive a booking number and total amount.

Steps:
Fill in the booking form.
Click the submit button.
Wait for the confirmation to be displayed.
Assert that the booking number and total amount are displayed correctly.
Expected Result: The user receives a booking number and total amount upon submission.

-------------------------------------------

Test Case 5: Navigating Back to Booking View After Confirmation
Objective: Ensure that the user can navigate back to the booking view after receiving confirmation.

Steps:
Complete a booking and receive confirmation.
Click the button to navigate back to the booking view.
Assert that the booking view is displayed.
Expected Result: The user can navigate back to the booking view after confirmation.

-------------------------------------------

Test Case 6: Ensure All Fields Are Filled
Objective: Ensure that the user cannot submit the form unless all fields are filled.

Steps:
Render the booking component.
Leave some fields blank (e.g., date, time, number of players, shoe sizes, number of lanes).
Attempt to submit the form.
Assert that an error message is displayed and the form is not submitted.
Expected Result: The user cannot submit the form and receives an error message indicating that all fields must be filled.

-------------------------------------------

Test Case 7: Ensure Shoe Sizes Match Number of Players
Objective: Ensure that the user cannot submit the form if the number of shoes does not match the number of players.

Steps:
Render the booking component.
Fill in the date, time, and number of players.
Add a different number of shoe sizes than the number of players.
Attempt to submit the form.
Assert that an error message is displayed and the form is not submitted.
Expected Result: The user cannot submit the form and receives an error message indicating that the number of shoes must match the number of players.

-------------------------------------------

Test Case 8: Ensure Players Per Lane Limit
Objective: Ensure that the user cannot submit the form if the number of players exceeds the maximum capacity of 4 players per lane.

Steps:
Render the booking component.
Fill in the date, time, number of players, and number of lanes.
Enter a number of players that exceeds 4 per lane.
Attempt to submit the form.
Assert that an error message is displayed and the form is not submitted.
Expected Result: The user cannot submit the form and receives an error message indicating that the number of players exceeds the maximum capacity per lane.
