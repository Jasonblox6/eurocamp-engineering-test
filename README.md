## Running The Application

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Runs the two tests

### Functionality Implemented

1. Navbar with logo, active state, hover behaviour, and routing on click.
2. Footer with placehlder text.
3. Bookings:
    - Header and summary text
    - Ability to add a new booking via CTA
        - Modal with overlay and cancellation behaviour
        - OnSubmit Validation (Requires a value for Parc)
        - POST Request for booking creation with basic error handling (it closes on error)
        - Successful submission refreshes the bookings table and goes to the last page
    - Table view with edit and delete iconography:
        - "Booking Reference" formed of concatenated slices of id, user, and bookingdate
        - Booking Date formatted from date string
        - Delete button to allow deletion of rows via confirmation modal. (Not Implemented)
        - Pagination via reused component
    - Retry functionality:
        - Should the initial fetch request fail to return the array of bookings from the DB, a set number of retries are attempted - on failure the logic displays a message instead of the table
4. Parcs and Users function the same in terms of retry logic, but beyond that do not have creation or deletion set up.
5. Unit Tests:
    - Two very basic unit tests have been implemented for the Bookings page.
    - Ideally I'd have written some with mock data, but time constraints meant I didn't want to waste time on this.

### If More Time

1. Implementation of the creation of parcs and users
2. Implementation of the delete logic described above.
3. I attempted to make components as reusable as possible (see pagination), though there are many cases where a DRY approach could have been taken:
    - The tables themselves could have been agnostic and accepted props for headers and the displayed values
    - Some CSS could be tidied up and reused where it has been copied
    - The pagination values (e.g. itemsPerPage could be set within a central config to be called from instead of having to adjust per table)
4. All created bookings default to a user I randomly selected, I would have liked to have included logic for:
    - Displaying details of a logged in user in the navbar
    - Filtering bookings based on user (if you are not an admin) and creating with the current user's id.
    - Displaying different navbar options based on admin flag similar to above (e.g. only admins can see users and create new parcs)

