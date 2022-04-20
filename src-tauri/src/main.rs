#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use cocoa::appkit::{NSWindow, NSWindowStyleMask, NSWindowTitleVisibility};
use tauri::Position::Physical;
use tauri::{Manager, PhysicalPosition, Runtime, Window};
use tauri::{SystemTray, SystemTrayEvent};
// use window_shadows::set_shadow;
// use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};
fn main() {
    let system_tray = SystemTray::new();
    tauri::Builder::default()
        .setup(|app| {
            let win_menubar = app.get_window("MenuBar").unwrap();
            let win_news = app.get_window("News").unwrap();
            // #[cfg(target_os = "macos")]
            // apply_vibrancy(&win_news, NSVisualEffectMaterial::UnderWindowBackground)
            //     .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
            win_menubar.set_transparent_titlebar(true, true);
            win_news.set_transparent_titlebar(true, false);
            // set_shadow(&win_menubar, true).expect("Unsupported platform!");
            Ok(())
        })
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position, size: _, ..
            } => {
                let win = app.get_window("MenuBar").unwrap();
                let pos = PhysicalPosition {
                    x: (position.x as i32) - 280,
                    y: position.y as i32,
                };

                if win.is_visible().unwrap() {
                    win.hide().unwrap();
                } else {
                    // println!("system tray received a left click: {:?}", position);
                    // window.show().unwrap();
                    win.hide().unwrap();
                    // window.set_always_on_top(true).unwrap();
                    win.set_position(Physical(pos)).unwrap();
                    // win.hide().unwrap();
                    win.set_focus().unwrap();
                }
            }
            SystemTrayEvent::RightClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a right click");
            }
            SystemTrayEvent::DoubleClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a double click");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "hide" => {}
                _ => {}
            },
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

pub trait WindowExt {
    #[cfg(target_os = "macos")]
    fn set_transparent_titlebar(&self, transparent: bool, remove_toolbar: bool);
}

impl<R: Runtime> WindowExt for Window<R> {
    #[cfg(target_os = "macos")]
    fn set_transparent_titlebar(&self, transparent: bool, remove_tool_bar: bool) {
        unsafe {
            let id = self.ns_window().unwrap() as cocoa::base::id;

            // 已经被启用，应该使用 HiddenTitleBarWindowStyle
            NSWindow::setTitlebarAppearsTransparent_(id, cocoa::base::YES);
            let mut style_mask = id.styleMask();
            style_mask.set(
                NSWindowStyleMask::NSFullSizeContentViewWindowMask,
                transparent,
            );

            // 移除左上角 toolbar
            if remove_tool_bar {
                style_mask.remove(
                    NSWindowStyleMask::NSClosableWindowMask
                        | NSWindowStyleMask::NSMiniaturizableWindowMask
                        | NSWindowStyleMask::NSResizableWindowMask,
                );
            }

            id.setStyleMask_(style_mask);

            // 隐藏 title 文字
            id.setTitleVisibility_(if transparent {
                NSWindowTitleVisibility::NSWindowTitleHidden
            } else {
                NSWindowTitleVisibility::NSWindowTitleVisible
            });

            // 隐藏 titlebar 横栏
            id.setTitlebarAppearsTransparent_(if transparent {
                cocoa::base::YES
            } else {
                cocoa::base::NO
            });
        }
    }
}
