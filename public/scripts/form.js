/* SLATOUT — enquiry form: validation, sanitisation, submission. Server-side validation is still required. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var clean = function (v, max) { return String(v || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/<[^>]*>/g, '').replace(/[ \t]+/g, ' ').trim().slice(0, max); };
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, PHONE = /^[+()\-.\s\d]{7,20}$/;

  // Prefill from ?stage=build&service=a,b
  var qs = new URLSearchParams(window.__q || location.search);
  if (qs.get('sent') === '1') { var m = $('#sent-msg'); if (m) m.hidden = false; }

  Array.prototype.forEach.call(document.querySelectorAll('form.enq'), function (form) {
    var st = qs.get('stage');
    if (st) { var r = form.querySelector('input[name=stage][value="' + CSS.escape(st) + '"]'); if (r) r.checked = true; }
    var sv = qs.get('service');
    if (sv) {
      var any = false; sv.split(',').forEach(function (s) { var c = form.querySelector('input[name=services][value="' + CSS.escape(s) + '"]'); if (c) { c.checked = true; any = true; } });
    }
    var mp = qs.get('msg'); var ta = form.querySelector('textarea[name=message]'); if (mp && ta && !ta.value) ta.value = clean(mp, 1200);
    var status = $('.form-status', form), sending = false;
    var fail = function (el, msg) {
      var f = el.closest('.fld'); f.classList.add('bad');
      var e = f.querySelector('.err'); if (!e) { e = document.createElement('p'); e.className = 'err'; e.id = el.id + '-err'; f.appendChild(e); }
      e.textContent = msg; el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-describedby', e.id);
    };
    var reset = function () {
      Array.prototype.forEach.call(form.querySelectorAll('.fld.bad'), function (f) { f.classList.remove('bad'); var e = f.querySelector('.err'); if (e) e.remove(); var i = f.querySelector('[aria-invalid]'); if (i) { i.removeAttribute('aria-invalid'); i.removeAttribute('aria-describedby'); } });
      status.className = 'form-status'; status.textContent = '';
    };
    form.addEventListener('submit', function (ev) {
      ev.preventDefault(); if (sending) return; reset();
      var fd = new FormData(form);
      if (clean(fd.get('company'), 50)) { status.textContent = 'Thank you.'; return; } // honeypot: pretend success
      var data = {
        name: clean(fd.get('name'), 120), email: clean(fd.get('email'), 160), phone: clean(fd.get('phone'), 24),
        message: clean(fd.get('message'), 1500), stage: clean(fd.get('stage'), 20),
        services: fd.getAll('services').map(function (s) { return clean(s, 60); }).filter(Boolean), page: location.pathname
      };
      var first = null;
      if (!data.name) { fail(form.elements.name, 'Please enter your name.'); first = first || form.elements.name; }
      if (!data.email && !data.phone) { fail(form.elements.email, 'Please give an email address or a phone number.'); first = first || form.elements.email; }
      if (data.email && !EMAIL.test(data.email)) { fail(form.elements.email, 'Please enter a valid email address.'); first = first || form.elements.email; }
      if (data.phone && !PHONE.test(data.phone)) { fail(form.elements.phone, 'Please enter a valid phone number.'); first = first || form.elements.phone; }
      if (first) { status.className = 'form-status bad'; status.textContent = 'Please check the highlighted fields.'; first.focus(); return; }
      var mode = form.getAttribute('data-mode'), btn = $('button[type=submit]', form);
      var done = function () { form.reset(); status.className = 'form-status ok'; status.textContent = 'Thank you. Your enquiry has been sent. We will reply soon.'; };
      var err = function (msg) { status.className = 'form-status bad'; status.textContent = msg || 'Sorry, something went wrong. Please try again in a moment.'; };
      if (form.hasAttribute('data-unconfigured')) { err('This form is not connected to an inbox yet, so nothing was sent.'); return; }
      if (mode === 'mailto') {
        var body = 'Name: ' + data.name + '\nEmail: ' + data.email + '\nPhone: ' + data.phone + '\nStage: ' + data.stage + '\nServices: ' + data.services.join(', ') + '\n\n' + data.message;
        location.href = 'mailto:' + form.getAttribute('data-mailto') + '?subject=' + encodeURIComponent('Website enquiry') + '&body=' + encodeURIComponent(body);
        status.className = 'form-status ok'; status.textContent = 'Your email app should open with the enquiry ready to send.'; return;
      }
      sending = true; btn.disabled = true; status.textContent = 'Sending…';
      var opts;
      if (mode === 'netlify') {
        var p = new URLSearchParams(); p.append('form-name', 'enquiry');
        Object.keys(data).forEach(function (k) { p.append(k, Array.isArray(data[k]) ? data[k].join(', ') : data[k]); });
        opts = { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: p.toString() };
        var url = '/';
      } else { opts = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) }; url = form.getAttribute('data-endpoint'); }
      fetch(url, opts).then(function (r) { if (!r.ok) throw new Error(r.status); done(); }).catch(function () { err(); }).then(function () { sending = false; btn.disabled = false; });
    });
  });
})();
