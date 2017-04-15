(function () {
    var datepicker = window.datepicker;
    var monthData, $wrapper;
    datepicker.buildUi = function (year, month) {
        monthData = datepicker.getMonthData(year, month);
        var bodyHtml = '';
        for (var i = 0; i < (monthData.days.length / 7) - 1; i++) {
            var td = '';
            for (var j = 0; j < 7; j++) {
                var date = monthData.days[j + (7 * i)].showDate;
                td += `<td data-date="${monthData.days[j + (7 * i)].date}">${date}</td>`;
            }
            bodyHtml += `<tr>${td}</tr>`;
        }
        var html = `
        <div class="ui-datepicker-header">
            <a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>
            <a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>
            <span class="ui-datepicker-curr-month">${monthData.year}-${monthData.month}</span>
        </div>
        <div class="ui-datepicker-body">
            <table>
                <thead>
                    <tr>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                        <th>日</th>
                    </tr>
                </thead>
                <tbody>
                    ${bodyHtml}
                </tbody>
            </table>
        </div>`;
        return {
            html: html,
            data: monthData
        };
    }

    datepicker.render = function (direction) {
        var year, month;
        if (monthData) {
            var year = monthData.year;
            var month = monthData.month;
        }

        if (direction === 'prev') {
            month--;
        }
        if (direction === 'next') {
            month++;
        }
        var D = datepicker.buildUi(year, month);
        $wrapper = document.querySelector('.ui-datepicker-wrapper');
        if (!$wrapper) {
            $wrapper = document.createElement('div');
            $wrapper.className = $wrapper.class = 'ui-datepicker-wrapper';
        }

        $wrapper.innerHTML = D.html;
    }
    datepicker.init = function (input) {
        datepicker.render()
        document.body.appendChild($wrapper);
        var $input = document.querySelector(input);
        var isOpen = false;
        $input.addEventListener('click', function () {
            if (isOpen) {
                $wrapper.classList.remove("ui-datepicker-wrapper-show");
                isOpen = false;
            } else {
                $wrapper.classList.add("ui-datepicker-wrapper-show");
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var inputH = $input.offsetHeight;
                $wrapper.style.left = left + 'px';
                $wrapper.style.top = (top + inputH + 2) + 'px';
                isOpen = true;
            }
        }, false)
        $wrapper.addEventListener('click', function (e) {
            var $target = e.target;
            if (!$target.classList.contains('ui-datepicker-btn')) return;
            if ($target.classList.contains('ui-datepicker-prev-btn')) {
                datepicker.render('prev')
            } else if ($target.classList.contains('ui-datepicker-next-btn')) {
                datepicker.render('next')
            }
        }, false)
        $wrapper.addEventListener('click', function (e) {
            var $target = e.target;
            if ($target.tagName.toLowerCase() !== 'td') return;
            var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date)
            $input.value = format(date);
            if (isOpen) {
                $wrapper.classList.remove("ui-datepicker-wrapper-show");
                isOpen = false;
            } 
        }, false)
    }

    function format(date) {
        var formatDate = '';
        var padding = function (num) {
            if (num <= 9) {
                return '0' + num;
            }
            return num;
        }
        formatDate += date.getFullYear() + '-';
        formatDate += padding(date.getMonth() + 1) + '-';
        formatDate += padding(date.getDate());
        return formatDate;
    }
})()