
// =====================================================
// MIRAVEN — RESERVATION
// =====================================================

const reservationForm = document.getElementById("reservationForm");
const quantityInputs = document.querySelectorAll(".quantity");

const selectedItems = document.getElementById("selectedItems");
const totalPrice = document.getElementById("totalPrice");

const confirmation = document.getElementById("confirmation");
const confirmationMessage = document.getElementById("confirmationMessage");


// =====================================================
// UPDATE ORDER SUMMARY
// =====================================================

function updateOrder() {
    let total = 0;
    const items = [];

    quantityInputs.forEach(input => {
        const quantity = Math.max(0, parseInt(input.value) || 0);
        const name = input.dataset.name;
        const price = parseFloat(input.dataset.price) || 0;

        if (quantity > 0) {
            const itemTotal = quantity * price;
            total += itemTotal;

            items.push({ name, quantity, itemTotal });
        }
    });

    selectedItems.replaceChildren();

    if (items.length === 0) {
        selectedItems.textContent = "No items selected yet.";
    } else {
        items.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("selected-item");

            const itemName = document.createElement("span");
            itemName.textContent = `${item.name} × ${item.quantity}`;

            const itemPrice = document.createElement("strong");
            itemPrice.textContent = `₦${item.itemTotal.toLocaleString("en-NG")}`;

            itemElement.append(itemName, itemPrice);
            selectedItems.appendChild(itemElement);
        });
    }

    totalPrice.textContent = `₦${total.toLocaleString("en-NG")}`;
}


// =====================================================
// WATCH QUANTITY CHANGES
// =====================================================

quantityInputs.forEach(input => {
    input.addEventListener("input", updateOrder);
});


// =====================================================
// SET MINIMUM RESERVATION DATE
// =====================================================

const dateInput = document.getElementById("reservationDate");

if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${year}-${month}-${day}`;
}


// =====================================================
// FORM SUBMISSION
// =====================================================

reservationForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!reservationForm.reportValidity()) return;

    const fullName = document.getElementById("fullName").value.trim();
    const guests = document.getElementById("guests").value;
    const date = dateInput.value;
    const time = document.getElementById("reservationTime").value;

    const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString(
        "en-NG",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

    // Build confirmation safely
    confirmationMessage.replaceChildren();

    const greeting = document.createElement("p");
    greeting.textContent = `Thank you, ${fullName}!`;

    const message = document.createElement("p");
    message.textContent =
        `Your reservation request for ${guests} guest(s) has been received.`;

    const dateInfo = document.createElement("p");
    dateInfo.textContent = `Date: ${formattedDate}`;

    const timeInfo = document.createElement("p");
    timeInfo.textContent = `Time: ${time}`;

    const closing = document.createElement("p");
    closing.textContent = "We look forward to welcoming you to Miraven.";

    confirmationMessage.append(
        greeting,
        message,
        dateInfo,
        timeInfo,
        closing
    );

    // Hide form and display confirmation
    reservationForm.style.display = "none";

    confirmation.hidden = false;
    confirmation.classList.add("show");

    confirmation.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});


// =====================================================
// INITIALISE ORDER SUMMARY
// =====================================================

updateOrder();
