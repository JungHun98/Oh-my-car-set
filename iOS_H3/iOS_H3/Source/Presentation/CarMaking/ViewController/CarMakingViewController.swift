//
//  CarMakingViewController.swift
//  iOS_H3
//
//  Created by  sangyeon on 2023/08/15.
//

import UIKit
import Combine

final class CarMakingViewController: UIViewController {

    enum Constants {
        static let titleBarHeight = 50.0
        static let bottomModalViewHeight = 129.0
    }

    // MARK: - UI properties

    private var titleBar: OhMyCarSetTitleBar!

    private var carMakingContentView: CarMakingContentView<PageSection>!

    private let bottomModalView = BottomModalView()

    // MARK: - Properties

    private let mode: CarMakingMode

    private let viewModel: CarMakingViewModel

    private let stepDidChanged = CurrentValueSubject<CarMakingStep, Never>(.powertrain)

    private var cancellables = Set<AnyCancellable>()

    // MARK: - Lifecycles

    init(mode: CarMakingMode, viewModel: CarMakingViewModel) {
        self.viewModel = viewModel
        self.mode = mode
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        self.mode = .selfMode
        self.viewModel = CarMakingViewModel()
        super.init(coder: coder)
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        setupProperties()
        setupViews()
        bind()
    }

    // MARK: - Helpers
}

// MARK: - binding with ViewModel

extension CarMakingViewController {

    private func bind() {
        let input = CarMakingViewModel.Input(
            viewDidLoad: viewDidLoadSubject,
            carMakingStepDidChanged: stepDidChanged
        )
        let output = viewModel.transform(input)

        output.currentStepInfo
            .sink(receiveValue: { [weak self] info in
                guard let self else { return }
                carMakingContentView.updateCurrentStepInfo(info)
            })
            .store(in: &cancellables)
    }
}

// MARK: - OhMyCarSetTitleBar Delegate

extension CarMakingViewController: OhMyCarSetTitleBarDelegate {

    func titleBarBackButtonPressed(_ titleBar: OhMyCarSetTitleBar) {
        print("[CarMakingViewController]", #function, "백버튼 클릭 액션 구현 필요")
    }

    func titleBarTitleButtonTapped(_ titleBar: OhMyCarSetTitleBar) {
        print("[CarMakingViewController]", #function, "title 버튼 클릭 액션 구현 필요")
    }

    func titleBarDictionaryButtonPressed(_ titleBar: OhMyCarSetTitleBar) {
        print("[CarMakingViewController]", #function, "백카사전 버튼 클릭 액션 구현 필요")
    }

    func titleBarChangeModelButtonPressed(_ titleBar: OhMyCarSetTitleBar) {
        print("[CarMakingViewController]", #function, "모드변경 버튼 클릭 액션 구현 필요")
    }
}

// MARK: - CarMakingContentView DataSource

extension CarMakingViewController: CarMakingContentViewDataSource {

    func carMakingContentView(urlForItemAtIndex indexPath: IndexPath) -> String? {
        return nil
    }

    func carMakingContentView(optionsForItemAtIndex indexPath: IndexPath) -> [OptionCardInfo]? {
        return nil
    }
}

// MARK: - BottomModalView Delegate & DataSource

extension CarMakingViewController: BottomModalViewDelegate, BottomModalViewDataSource {

    func bottomModalViewBackButtonDidTapped(_ bottomModalView: BottomModalView) {
        carMakingContentView.movePrevStep()
    }

    func bottomModalViewCompletionButtonDidTapped(_ bottomModalView: BottomModalView) {
        carMakingContentView.moveNextStep()
    }

    func estimateSummaryData(in bottomModalView: BottomModalView) -> Int {
        return -1
    }
}

// MARK: - Setup Properties

extension CarMakingViewController {

    private func setupProperties() {
        setupTitleBar()
        setupContentView()
        setupBottomModalView()
    }

    private func setupTitleBar() {
        let titleBarType: OhMyCarSetTitleBar.NavigationBarType = (mode == .selfMode) ? .selfMode : .guideMode
        titleBar = OhMyCarSetTitleBar(type: titleBarType)
        titleBar.delegate = self
        titleBar.translatesAutoresizingMaskIntoConstraints = false
    }

    private func setupContentView() {
        carMakingContentView = CarMakingContentView(frame: .zero, mode: mode)
        carMakingContentView.dataSource = self
        carMakingContentView.translatesAutoresizingMaskIntoConstraints = false
    }

    private func setupBottomModalView() {
        bottomModalView.delegate = self
        bottomModalView.dataSource = self
        bottomModalView.translatesAutoresizingMaskIntoConstraints = false
    }
}

// MARK: - SetupViews

extension CarMakingViewController {

    private func setupViews() {
        view.backgroundColor = .white
        addSubviews()
        setupConstraints()
    }

    private func addSubviews() {
        [titleBar, carMakingContentView, bottomModalView].forEach {
            view.addSubview($0)
        }
    }

    private func setupConstraints() {
        setupTitleBarConstraints()
        setupContentViewConstraints()
        setupBottomModalViewConstraints()
    }

    private func setupTitleBarConstraints() {
        NSLayoutConstraint.activate([
            titleBar.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            titleBar.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
            titleBar.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor),
            titleBar.heightAnchor.constraint(equalToConstant: Constants.titleBarHeight)
        ])
    }

    private func setupContentViewConstraints() {
        NSLayoutConstraint.activate([
            carMakingContentView.topAnchor.constraint(equalTo: titleBar.bottomAnchor),
            carMakingContentView.leadingAnchor.constraint(equalTo: titleBar.leadingAnchor),
            carMakingContentView.trailingAnchor.constraint(equalTo: titleBar.trailingAnchor),
            carMakingContentView.bottomAnchor.constraint(
                equalTo: view.safeAreaLayoutGuide.bottomAnchor,
                constant: -Constants.bottomModalViewHeight
            )
        ])
    }

    private func setupBottomModalViewConstraints() {
        NSLayoutConstraint.activate([
            bottomModalView.leadingAnchor.constraint(equalTo: titleBar.leadingAnchor),
            bottomModalView.trailingAnchor.constraint(equalTo: titleBar.trailingAnchor),
            bottomModalView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor)
        ])
    }
}
