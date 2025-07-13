var stats = {
  stars : [],
  count : Number,
}

function waitForRows(selector, callback, timeout = 10000) {
  const start = Date.now();

  const check = () => {
    const rows = document.querySelectorAll(selector);
    if (rows.length > 0) {
      callback(rows);
    } else if (Date.now() - start < timeout) {
      requestAnimationFrame(check);
    } else {
      console.warn(`Timeout waiting for selector: ${selector}`);
    }
  };

  check();
}

function waitForSpanInDiv(selector, callback, timeout = 10000) {
  const start = Date.now();

  const check = () => {
    const container = document.querySelector(selector);
    if (container) {
      const span = container.querySelector('span');
      if (span && span.textContent.trim().length > 0) {
        callback(span.textContent.trim());
        return;
      }
    }

    if (Date.now() - start < timeout) {
      requestAnimationFrame(check);
    } else {
      console.warn(`Timeout waiting for span inside: ${selector}`);
    }
  };
  check();
}


waitForRows('.BHOKXe', (rows) => {
  rows.forEach((row, index) => {
    const label = row.getAttribute('aria-label');
    if (label) {
      labelOnlyCount = label.split(",");
      labelOnlyNum = labelOnlyCount[1].split(" ");
      numNoDecSep = labelOnlyNum[0].replace(".", "");
      stats.stars.push(parseInt(numNoDecSep));
    }
  });
});

waitForSpanInDiv('.HHrUdb', (text) => {
  stats.count = parseInt(text.replace(".", ""));
});

console.log(stats);