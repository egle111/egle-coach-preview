document.querySelector('#contact-form').addEventListener('submit', event => {
 event.preventDefault();
 const data = new FormData(event.currentTarget);
 const body = String(data.get('message')) + '\n\n' + String(data.get('name')) + '\n' + String(data.get('email'));
 window.location.href = 'mailto:hi@100percent.coach?subject=' + encodeURIComponent('Website enquiry') + '&body=' + encodeURIComponent(body);
});