

run function on form submission
stop default behavior
get form data
serialize form data // use FormData
// check if inputs valid
//   alert if any of form data is empty
no need to check on client side as server is handling it in this
exercise

create post request
  method of post
  headers not needed because of FormData
  body is serialized data
  submit if valid

on successful response alert user with response data



Listener for form submission
    on submit
    prevent default behavior 
    Convert to form data
    Serialize data
        loop over fieldsets
            convert each fieldset object of schedules with respective keys and values
    create post request with fetch
        use json content-type

    handle response
        201 and 400
        alert user to response
        clear forms if successful

Button to add more fieldsets to form
    on click inserts a new fieldset onto the page
    will need to auto increment in the ids and such

on page load will add 1 fieldset
    fetch all names and ids of staff members 
    use to populate selection option dropdown

???????????why are we able to call an asynchronous function when the dom loads without using the await keyword 

----------------------------------------------------------------------------------------------------------------------------------

student book a staff schedule
    prevent default
    serialize form data
        get id of schedule
        get student email
        turn form data into json object {student_email: 'email', id: 3}
    send data as ajax post request via fetch /api/bookings
        rquest header content type is application json
        request body will json

    handle the response
        if 204
            alert user successfully added booking
        if 404 
            prompt user to create new student
            autofill in new booking sequence in the new student form
        if 404
            display error schedule does not exist or booked already


create a new student
    prevent default behavior
    serialze the form data
        get booking_sequence
        get the name
        get the email
        turn in to json object {booking_sequence: '', email: '', name: ''}

    send the data as ajax post request via fetch to /api/students
        method is POST
        request header content-type is application/json
        body is json
    
    handle response
        if 201
            alert success message for creating student
            send the book staff schedule form
            reset forms
        if 400
            alert bad inputs
        if 403
            alert missing input 



populating schedule options
    on click of schedule option dropdown
        fetch all avaialbe schedules
            either create new route to fetch only available schedules
            or fetch all schedules and then filter only available ones (no student email set)
        handle response
            alert if failure

        else populate selection dropdown options
        iterate over all avaiable schedules
            create new option html element
                set value to schedule.id
                set text to joing Name, date, time together with "|" 
        insert new options html elements into schedule selection option

new student form template renderer
    takes email and booking sequence as args
    returns html for student form with booking_sequcne value and email value preset


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function to fetch all booked dates
    return dates


function to render dates on the page
    getdates

    loop over dates
        insert list item onto the page


function to create a list item of a date from template




Add event listener to container of date elements
    only trigger it if class is date

    prevent default behavior
    create ajax request to get data from endpont /api/bookings/:date

    loop over bookings
        create a li item joining all values together
        insert li into Sublist

    handle respoonse



Main function to load data.

-------------------------------------------------------------------------------------------------------------------------------------------

Form text input for booking id
    on submit run cancelBooking

Cancel booking
    needs a booking_id
    can only delete booking if it exists

    create a ajax PUT request with fetch
    no data is being passed in the body
    just add the id of the booking id being deleted to the path
    add a header of method PUT

    handle response
        alert  success if 204
        alert error message if failure
    reset form

Form text input for cancel schedule
    on submit run cancelSchedule


Cancel staff schedule
    needs schedule_id
    can only cancel schedule if exists and has no bookings

    create ajax DELETE request
        attach schedule_id to path for fetch
        set header method to DELETE
    
    handle response
        if 204 alert success message
        if 403
            alert error message
        if 404
            alert error message



