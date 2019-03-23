const methods = {
	caculateGap(gap = [], current) {
        // debugger;
        /**
         * 通过 起始到结束的时间区间，和当前日期作对比
         * 最终返回一个7个数字的数组
         * 用来作月份的加减
         */
        const _this = this
		let months = [];
		if (gap.length) {
            current = (current >= gap[0] && current <= gap[1]) ? current : gap[0];
            let before, after
            before = _this.dateSubtract('Month', current, gap[0]),
            after = _this.dateSubtract('Month', gap[1], current)
            months = _this.calArr(before, after)
		} else {
			months = [-3, -2, -1, 0, 1, 2, 3];
		}
		return months;
    },
    dateSubtract(unit, d1, d2) {
        /**
         * 运算两个日期之间的年份，月份，日期，小时，分钟，秒的差值，并返回差值的绝对值
         */
        let year1 = d1.getFullYear(),
            year2 = d2.getFullYear(),
            month1 = year1*12 + d1.getMonth(),
            month2 = year2*12 + d2.getMonth(),
            date1 = d1.getTime() / (24*60*60*1000),
            date2 = d2.getTime() / (24*60*60*1000),
            hour1 = date1*24 + d1.getHours(),
            hour2 = date2*24 + d2.getHours(),
            minutes1 = hour1*60 + d1.getMinutes(),
            minutes2 = hour2*60 + d2.getMinutes(),
            seconds1 = minutes1*60 + d1.getSeconds(),
            seconds2 = minutes2*60 + d2.getSeconds(),
            result
        switch(unit) {
            case 'FullYear':
                result = Math.abs(year1 - year2)
                break
            case 'Month':
                result = Math.abs(month1 - month2)
                break
            case 'Date':
                result = Math.abs(date1 - date2)
                break
            case 'Hours':
                result = Math.abs(hour1 - hour2)
                break
            case 'Minutes':
                result = Math.abs(minutes1 - minutes2)
                break
            case 'Seconds':
                result = Math.abs(seconds1 - seconds2)
                break
        }
        return parseInt(result)
            
    },
    calArr(before, after) {
        /**
         * 用于返回用来计算最终结果的数组。
         * 会根据传入的两个数字的大小来判断返回的数组的形式
         */
        let arr = []
        if (before >= 3 && after >= 3) {
            arr = []
            /**
             * 前后都能够有三个数字用来填满整个数组加上0使数组长度为7
             */
            arr = [-3, -2, -1, 0, 1, 2, 3]
        // } else if (before < 3 && after - before >= 3) {
        } else if (before < 3 && after - before > 3) {
            /**
             * 前面不够三个数字，
             * 但是后面的数字加上前面数字加上0大于或等于7
             */
            arr = []
            for(let i = 1; i <= before; i++) {
                arr.push(-i)
            }
            arr.reverse()
            arr = arr.concat([0, 1, 2, 3])
            for(let j = 1; j <= (3 - before); j++) {
                arr.push(3 + j)
            }
        // } else if (after < 3 && before - after >= 3) {
        } else if (after < 3 && before - after > 3) {
            /**
             *后面不够三个数字，
             但是前面的数字加上后面数字加上0大于或等于7
             */
            arr = [0, -1, -2, -3]
            for(let j = 1; j <= (3 - after); j++) {
                arr.push(-(3 + j))
            }
            arr.reverse()
            for(let i = 1; i <= after; i++) {
                arr.push(i)
            }
        // } else if ((before < 3 && Math.abs(after - before) < 3) || (after < 3 && Math.abs(before - after) < 3)) {
        } else {
            /**
             * 前后数字加起来不足7个
             */
            arr = []
            for (let i = 1; i <= before; i++) {
                arr.push(-i)
            }
            arr.reverse()
            arr.push(0)
            for (let j = 1; j <= after; j++) {
                arr.push(j)
            }
        }
        return arr
    },
	caculateMonth(num, date) {
        /**
         * 传入数字 num 和日期 date
         * 计算 date 的月份与 num 的差值并返回计算后的date, year 和 month
         */
        let d = date.toString() // 如果直接把 date 赋值给 d 只是让 d 和 date 指向同一个内存地址，把 date 变成字符串后就把这个时间字符串直接存到了 d 的内存空间
        let month = date.getMonth() + num
        let newDate = date.setMonth(month);
		newDate = new Date(newDate);
		newDate = {
			date: newDate.toString(),
			year: newDate.getFullYear(),
			month: newDate.getMonth() + 1
        };
        date = new Date(d)
		return newDate;
    },
    contrast(unit, a, b) {
        /**
         * 对比两个日期 a , b 的大小，返回值大于 0 为 a > b ,返回值小于 0 为 a < b 
         * unit 为一个字符串，可受的字符有 FullYear, Month, Date, Day, Hours, Minutes, Secondes ...
         * a, b  为一个Date对象或一个对象里包含需要对当前Date进行单位换算后需要加上的数字，传入负数为相减，如果为后一种情况，对象格式形如：
         * {num: 3, date: new Date()}
         */
        let get = 'get' + unit,
            set = 'set' + unit,
            aNum = a.num ? a.num : 0,
            aDate = a.date ? new Date(a.date) : new Date(a),
            bNum = b.num ? b.num : 0,
            bDate = b.date ? new Date(b.date) : new Date(b),
            start = aDate[set](aDate[get]() + aNum),
            end = bDate[set](bDate[get]() + bNum),
            result = start - end
        return result
    },
    getUnitDate(date, unit) {
        /**
         * 根据传入的 unit 单位返回从FullYear 到当前单位时间字符，再把这个字符转为Date对象
         */
        let _this = this,
            units = ['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Secondes']
        units = units.slice(0, units.indexOf(unit) + 1)
        date = new Date(date)
        let dateStr = units.reduce((a, b) => {
            return `${_this.getDateStr(date, a)}-${_this.getDateStr(date, b)}`
        })
        return new Date(dateStr)
    },
    getDateStr(date, unit) {
        /**
         * 根据 unit 单位返回当前单位对应的日期字符串
         */
        if (unit === 'Month') {
            date = date[`get${unit}`]() + 1
        } else {
            date = date[`get${unit}`]()
        }
        return date
    }
};

export default (gap = [], current = new Date(), unit = "Month") => {
    gap = gap.length && gap.map(item => {
            item = new Date(item);
            return item
        });

    current = methods.getUnitDate(current, unit);
    let currentStr = current.toString()
    let months = methods.caculateGap(gap, new Date(currentStr));
    months = months.map(item => {
        let month = methods.caculateMonth(item, new Date(currentStr));
        if (item === 0) {
            month.active = true;
        } else {
            month.active = false;
        }
        return month;
    });
    return months;
}
