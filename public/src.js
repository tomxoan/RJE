function validateData() {
  try {
    const url = window.location.host + '/validate';
    fetch('validate')
      .then((response) => {
        return response.json();
      })
      .then((errors) => {
        let sDiv = '';
        sDiv += `<div id='error_column_header' class="error-item">`;
        sDiv += `<div>Line</div>`;
        sDiv += `<div>Message</div>`;
        sDiv += `<div>Value</div>`;
        sDiv += '</div>';
        errors.forEach((o) => {
          sDiv += `<div class="error-item">`;
          sDiv += `<div>${o['line']}</div>`;
          sDiv += `<div>${o['message']}</div>`;
          sDiv += `<div>${o['value']}</div>`;
          sDiv += '</div>';
        });
        document.getElementById('error-list-wrapper').innerHTML = sDiv;
      });
  } catch (error) {}
}
